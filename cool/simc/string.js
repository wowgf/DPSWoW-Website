import _ from 'lodash';

export function canUpperCaseChar(string, pos) {
  return string.charCodeAt(pos) < 126;
}

export function uppercaseName(name) {
  return _.toUpper(name);
}

export function capitalizeName(name) {
  // normalize capitalization of primary actor. Armory results will be
  // capitalized, but only perform on ASCII first char
  if (canUpperCaseChar(name, 0)) {
    return _.capitalize(name);
  }
  return name;
}

export function formatDps(num, minLength = 7, numDigits = 4) {
  const origLength = _.round(num).toString().length;
  if (origLength < minLength) {
    return _.round(num).toLocaleString();
  }
  const suffixes = ['', 'K', 'M', 'B', 'T'];
  let result = num;
  let mag = 0;
  while (result > 1000) {
    result /= 1000;
    mag += 1;
  }
  const numDecimals = numDigits - _.round(result).toString().length;
  const number = result.toLocaleString(undefined, {
    minimumFractionDigits: numDecimals,
    maximumFractionDigits: numDecimals,
  });
  return `${number}${suffixes[mag]}`;
}
