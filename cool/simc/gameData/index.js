// Change this import and DEFAULT_GAME_VERSION to change the game data version the code is using
import _ from "lodash";
import Promise from "bluebird";
import axios from "axios";

import { DEVMODE, deepFreeze } from "./util";

const GameData = {};

export const FILES = [
  {
    // Preload

    key: "GameDataMetadata",
    fileName: "metadata",
    preload: true,
  },
  {
    key: "BonusAffixNames",
    fileName: "bonus-affix-names",
    preload: true,
  },
  {
    key: "BonusCraftedStats",
    fileName: "bonus-crafted-stats",
    preload: true,
  },
  {
    key: "BonusEffects",
    fileName: "bonus-effects",
    preload: true,
  },
  {
    key: "BonusLevels",
    fileName: "bonus-id-levels",
    preload: true,
  },
  {
    key: "BonusBaseLevels",
    fileName: "bonus-id-base-levels",
    preload: true,
  },
  {
    key: "BonusLevelDeltas",
    fileName: "bonus-level-deltas",
    preload: true,
  },
  {
    key: "BonusSockets",
    fileName: "bonus-sockets",
    preload: true,
  },
  {
    key: "BonusUpgradeSets",
    fileName: "bonus-upgrade-sets",
    preload: true,
  },
  {
    key: "Crafting",
    fileName: "crafting",
    preload: true,
  },
  {
    key: "Enchantments",
    fileName: "enchantments",
    preload: true,
  },
  {
    key: "EncounterNames",
    fileName: "encounter-names",
    preload: true,
  },
  {
    key: "Foods",
    fileName: "foods",
    preload: true,
  },
  {
    key: "InstanceNames",
    fileName: "instance-names",
    preload: true,
  },
  {
    key: "Instances",
    fileName: "instances",
    preload: true,
  },
  {
    key: "ItemConversions",
    fileName: "item-conversions",
    preload: true,
  },
  {
    key: "ItemSets",
    fileName: "item-sets",
    preload: true,
  },
  {
    key: "NewTalents",
    fileName: "talents",
    preload: true,
  },
  {
    key: "Potions",
    fileName: "potions",
    preload: true,
  },
  {
    key: "Flasks",
    fileName: "flasks",
    preload: true,
  },
  {
    key: "Augments",
    fileName: "augments",
    preload: true,
  },
  {
    key: "Seasons",
    fileName: "seasons",
    preload: true,
  },
  {
    key: "LevelSelectorSequences",
    fileName: "level-selector-sequences",
    preload: true,

    // Do not preload
  },
  {
    key: "Bonuses",
    fileName: "bonuses",
  },
  {
    key: "EncounterItems",
    fileName: "encounter-items",
  },
  {
    key: "EquippableItems",
    fileName: "equippable-items",
  },
  {
    key: "IconLookup",
    fileName: "icon-lookup",
  },
  {
    key: "ItemCurves",
    fileName: "item-curves",
  },
  {
    key: "ItemLimitCategories",
    fileName: "item-limit-categories",
  },
  {
    key: "ItemNames",
    fileName: "item-names",
  },
  {
    key: "TempEnchants",
    fileName: "temp-enchants",
  },
];

export const getFileInfo = (key) => _.find(FILES, { key });

const PRELOAD = _.filter(FILES, { preload: true });

// this goes to the live domain on purpose- this URL is a path rule in the google cloud load balanced that loads from
// the google storage raidbots-static bucket. This should help avoid some issues with a browser not liking
// the storage.googleapis.com domain. It also gets CloudFlare cached (which could be confusing because GCS also does
// some basic caching?)
const cdnUrl = (version, name) =>
  `/wow/data/${version}/${name}.json`;
const devUrl = (version, name) => `/data/${version}/${name}.json`;

const cdnLoader = async (ver, fileName) => {
  const response = await axios.get(cdnUrl(ver, fileName));
  return response.data;
};
const devLoader = async (ver, fileName) => {
  const response = await axios.get(devUrl(ver, fileName));
  return response.data;
};

let preloaded = false;
let version = "live";
let fallbackVersion;
let loadFn = DEVMODE ? devLoader : cdnLoader;

export const getVersions = () => ({
  version,
  fallbackVersion,
});
export const setVersions = (ver, fallbackVer) => {
  version = ver;
  fallbackVersion = fallbackVer;
};
export const setLoader = (fn) => {
  loadFn = fn;
};

export const load = async (key, reload = false) => {
  if (!reload && GameData[key]) {
    return {
      alreadyLoaded: true,
    };
  }
  const versions = _.filter([version, fallbackVersion]);
  const file = _.find(FILES, { key });
  while (versions.length) {
    const ver = versions.shift();
    try {
      const start = Date.now();
      // eslint-disable-next-line no-await-in-loop
      const data = await loadFn(ver, file.fileName);
      const duration = Date.now() - start;
      GameData[key] = data;
      deepFreeze(GameData[key]);
      return {
        fileName: file.fileName,
        duration,
      };
    } catch (err) {
      // eslint-disable-next-line no-console
      console.warn(
        "Unable to load game data, trying next version",
        ver,
        file.fileName,
        key
      );
      // eslint-disable-next-line no-console
      console.error("Error:", err.message);
    }
  }
  throw new Error("Unable to load game data", file.fileName, key);
};

export const preload = async () => {
  if (preloaded) {
    return;
  }

  await Promise.map(PRELOAD, async ({ key }) => {
    await load(key);
  });

  preloaded = true;
};

export const reload = async () => {
  return Promise.map(_.keys(GameData), (key) => {
    return load(key, { reload: true });
  });
};

const dataReads = _.fromPairs(_.map(FILES, ({ key }) => [key, 0]));

export default new Proxy(GameData, {
  get(obj, prop) {
    if (!preloaded) {
      throw new Error(`Attempt to reference GameData.${prop} before preload`);
    }
    if (obj[prop] === undefined) {
      throw new Error(
        `Attempt to reference GameData.${prop} but it has not been loaded`
      );
    }
    if (!dataReads[prop]) {
      dataReads[prop] = 0;
    }
    dataReads[prop] += 1;
    return obj[prop];
  },
});
