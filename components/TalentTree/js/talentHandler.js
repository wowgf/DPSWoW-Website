const BASE64_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
// Constants from Blizzard's code
const LOADOUT_VERSION = 2;
const VERSION_BITS = 8;    // 序列化版本
const SPEC_BITS = 16;      // 专精ID
const TREE_BITS = 128;     // 天赋树哈希
const RANK_BITS = 6;       // 天赋等级
const CHOICE_BITS = 2;     // 选择索引
const BYTE_SIZE = 6;       // Base64编码的位数

// 解析Base64编码的天赋字符串
export function parseTalentString(talentString, allTalentData) {
    console.log('Parsing talent string:', talentString);

    // 验证字符串是否只包含Base64字符
    const validString = talentString.replace(/=/g, '');
    if (validString.split('').some(char =>!BASE64_CHARS.includes(char))) {
        throw new Error('Invalid Base64 characters in talent string');
    }

    // 检查字符串长度是否足够
    if ((VERSION_BITS + SPEC_BITS + TREE_BITS) > validString.length * BYTE_SIZE) {
        throw new Error('Talent string too short');
    }

    // 初始化位读取器
    let head = 0;
    let currentByte = BASE64_CHARS.indexOf(validString[0]);

    // 位读取函数
    function getBits(bits) {
        let val = 0;
        for (let i = 0; i < bits; i++) {
            const bit = head % BYTE_SIZE;
            head++;
            val += ((currentByte >> bit) & 1) << Math.min(i, 31);

            if (bit === BYTE_SIZE - 1) {
                const byteIndex = Math.floor(head / BYTE_SIZE);
                if (byteIndex >= validString.length) {
                    currentByte = 0;
                } else {
                    currentByte = BASE64_CHARS.indexOf(validString[byteIndex]);
                }
            }
        }
        return val;
    }

    // 读取版本号
    const version = getBits(VERSION_BITS);
    // 读取专精ID
    const specId = getBits(SPEC_BITS);
    console.log('Version:', version);
    console.log('Spec ID:', specId);

    // 获取对应专精的天赋数据
    const currentSpec = findSpecBySpecId(specId, allTalentData);
    if (!currentSpec) {
        throw new Error('Invalid spec ID');
    }

    // 验证版本号
    if (version!== LOADOUT_VERSION) {
        throw new Error(`Invalid serialization version: ${version}, expected: ${LOADOUT_VERSION}`);
    }

    // 读取树哈希值(128位)
    getBits(TREE_BITS);
    console.log('Tree Hash read');

    // 开始解析节点
    const nodes = [];
    let nodeIndex = 0;  // 起始节点索引(测出来就是7开始)

    while (head < validString.length * BYTE_SIZE) {

        // 检查节点是否被选中（激活）
        const selected = getBits(1);

        if (selected) {

            const fullNodeOrderIds = currentSpec.fullNodeOrder;
            const nodeId = fullNodeOrderIds[nodeIndex];
            // 获取节点信息
            const node = findNodeById(nodeId, currentSpec);

            if (!node) {
                nodeIndex++;
                console.warn(`Invalid node ID: ${nodeId}`);
                continue;
             }

            // 检查节点是否被购买（花费天赋点）
            const purchased = getBits(1);
            let rank = node.maxRanks || 1; // 默认给maxRanks, 英雄入口节点没有maxRanks
            if (!purchased) {
                rank = 1; // 未购买默认为1
            }

            if (purchased) {
                // 检查是否有部分等级（未点满）
                const partialRank = getBits(1);

                if (partialRank) {
                    rank = getBits(RANK_BITS);
                }

                // 检查是否是选择节点（多选一的天赋）
                const isChoice = getBits(1);

                if (isChoice) {
                    let isHeroEntryNode = false;
                    const choiceIndex = getBits(CHOICE_BITS);
                    if (node.type === 'subtree') {
                        isHeroEntryNode = true;
                    }
                    nodes.push({
                        index: nodeIndex,
                        id: nodeId,
                        purchased,
                        rank,
                        maxRanks: node.maxRanks,
                        choiceIndex,
                        isHeroEntryNode,
                        name: node.name,
                        icon: node.entries[choiceIndex]?.icon,
                        nodeInfo: node,
                    });
                } else {
                    nodes.push({
                        index: nodeIndex,
                        id: nodeId,
                        purchased,
                        rank,
                        maxRanks: node.maxRanks,
                        name: node.name,
                        icon: node.entries[0].icon,
                        nodeInfo: node,
                    });
                }
            } else {
                nodes.push({
                    index: nodeIndex,
                    id: nodeId,
                    purchased,
                    rank,
                    maxRanks: node.maxRanks,
                    name: node.name,
                    icon: node.entries[0].icon,
                    nodeInfo: node,
                });
            }
        }

        nodeIndex++;
    }
    const points = generatePoints(nodes);
    const selectedEntries = generateSelectedEntries(nodes);

    // console.log('Nodes:', nodes);

    return { version, specId, nodes, points, selectedEntries };
}

function findSpecBySpecId(specId, allTalentData) {
    return allTalentData.find((spec) => spec.specId === specId);
}

// 生成天赋字符串
export function generateTalentString(nodes, specId) {
    let bits = '';

    // 添加指定位数的比特
    function addBits(value, numBits) {
        for (let i = 0; i < numBits; i++) {
            bits += (value >> i) & 1;
        }
    }

    // 写入版本号和专精ID
    addBits(LOADOUT_VERSION, VERSION_BITS);
    addBits(specId, SPEC_BITS);

    // 写入树哈希（全0）
    addBits(0, TREE_BITS);

    // 获取专精数据
    const spec = findSpecBySpecId(specId);
    if (!spec) {
        throw new Error('Invalid spec ID');
    }

    // 将节点索引转换为正确的顺序
    const orderedNodes = nodes.map(node => {
        const orderIndex = spec.fullNodeOrder.indexOf(node.index);
        if (orderIndex === -1) {
            throw new Error(`Invalid node index: ${node.index}`);
        }
        return {
           ...node,
            index: orderIndex
        };
    });

    // 获取最大节点索引
    const maxNodeIndex = Math.max(...orderedNodes.map(node => node.index));

    // 写入节点状态
    for (let i = 0; i <= maxNodeIndex; i++) {
        const node = orderedNodes.find(n => n.index === i);

        // 节点是否被选择
        addBits(node? 1 : 0, 1);

        if (node) {
            // 节点是否被购买
            addBits(node.purchased? 1 : 0, 1);

            if (node.purchased) {
                // 是否部分等级
                const isPartialRank = node.rank > 1;
                addBits(isPartialRank? 1 : 0, 1);

                if (isPartialRank) {
                    addBits(node.rank, RANK_BITS);
                }

                // 是否是选择节点
                addBits(node.choiceIndex!== undefined? 1 : 0, 1);
                if (node.choiceIndex!== undefined) {
                    addBits(node.choiceIndex, CHOICE_BITS);
                }
            }
        }
    }

    // 将比特流转换为Base64字符串
    let talentString = '';
    for (let i = 0; i < bits.length; i += BYTE_SIZE) {
        let byte = 0;
        for (let j = 0; j < BYTE_SIZE && i + j < bits.length; j++) {
            byte |= parseInt(bits[i + j]) << j;
        }
        talentString += BASE64_CHARS[byte];
    }

    return talentString;
}

// 生成points对象
function generatePoints(nodes) {
    const points = {};
    nodes.forEach(node => {
        if (node.purchased) {
            points[node.id] = node.rank;
        }
    });
    return points;
}

// 生成选择项节点map
function generateSelectedEntries(nodes) {
    const selectedEntries = {};
    nodes.forEach(node => {
        if (node.purchased && typeof node.choiceIndex !== 'undefined') {
            selectedEntries[node.id] = node.choiceIndex;
        }
    });
    return selectedEntries;
}

function findNodeById(nodeId, spec) {
    return [...spec.classNodes,...spec.specNodes,...spec.heroNodes,...spec.subTreeNodes]
       .find(node => node.id === nodeId);
}

// Export for different environments
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        parseTalentString, generateTalentString
    };
  } else if (typeof define === 'function' && define.amd) {
    define(function() { return {
        parseTalentString, generateTalentString
    }; });
  } else if (typeof window !== 'undefined') {
    window.parseTalentString = parseTalentString;
    window.generateTalentString = generateTalentString;
  }