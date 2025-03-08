/* eslint-env browser, node */
import _ from 'lodash';

// eslint-disable-next-line no-console
export const jlog = obj => {
  if (typeof window !== 'undefined') {
    // eslint-disable-next-line no-console
    console.table(obj);
  } else {
    // eslint-disable-next-line no-console
    console.log(JSON.stringify(obj, null, 2));
  }
};

export const DEVMODE = import.meta.env.DEV;

export const SECONDS = 1000;
export const MINUTES = 60 * SECONDS;
export const HOURS = 60 * MINUTES;
export const DAYS = 24 * HOURS;

export const partialIp = ip => {
  let parts = _.split(ip, '.');
  // ip4
  if (_.size(parts) > 2) {
    const partial = _.join(_.dropRight(parts, _.size(parts) - 2), '.');
    return partial;
  }

  // ip 6
  parts = _.split(ip, ':');
  if (_.size(parts) === 8) {
    const partial = _.join(_.dropRight(parts, _.size(parts) - 4), ':');
    return partial;
  }

  return ip;
};

export const BETA_HOSTS = [
  'beta.raidbots.com',
  'ulduar.raidbots.com',
  'karazhan.raidbots.com',
  'moltencore.raidbots.com',
  'antorus.raidbots.com',
  'mimiron.raidbots.com',
];

export const isBetaHost = host => {
  return _.includes(BETA_HOSTS, host) || process.env.RAIDBOTS_ENV === 'beta';
};

export const shouldRunExperiment = (rawPercent) => {
  const percent = parseInt(rawPercent, 10) || 0;
  let experimentRolled = false;
  if (percent > 0) {
    const roll = _.random(0, 99);
    experimentRolled = roll >= (100 - percent);
  }
  return experimentRolled;
};

// needs to match SimC's util::tokenize
export const tokenize = str => {
  let result = str;

  result = _.trimStart(result, '_+');
  result = result.replace(/[-+.%]+/g, '');
  result = _.toLower(result);
  result = _.snakeCase(result);

  return result;
};

export function deepFreeze(object) {
  // Retrieve the property names defined on object
  const propNames = Object.getOwnPropertyNames(object);

  // Freeze properties before freezing self

  // eslint-disable-next-line no-restricted-syntax
  for (const name of propNames) {
    const value = object[name];

    if (value && typeof value === 'object') {
      deepFreeze(value);
    }
  }

  return Object.freeze(object);
}
