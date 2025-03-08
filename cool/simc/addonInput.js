import _ from "lodash";
import * as semver from "semver";

import SharedConfig from "./config";

const SIMC_VERSION_REGEX = /^# SimC Addon (.*)$/;
const RAIDBOTS_GENERATED_REGEX = /Raidbots-Generated Simc Input/i;
const WOW_VERSION_REGEX = /^# WoW (.*), TOC (.*)$/;
const CHECKSUM_REGEX = /^# Checksum: (.*)/;

// adapted https://gist.github.com/joni/3760795
/* eslint-disable no-bitwise */
function toUTF8Array(str) {
  const utf8 = [];
  for (let i = 0; i < str.length; i += 1) {
    let charcode = str.charCodeAt(i);
    if (charcode < 0x80) {
      utf8.push(charcode);
    } else if (charcode < 0x800) {
      utf8.push(0xc0 | (charcode >> 6), 0x80 | (charcode & 0x3f));
    } else if (charcode < 0xd800 || charcode >= 0xe000) {
      utf8.push(
        0xe0 | (charcode >> 12),
        0x80 | ((charcode >> 6) & 0x3f),
        0x80 | (charcode & 0x3f)
      );
    } else {
      i += 1;
      // UTF-16 encodes 0x10000-0x10FFFF by
      // subtracting 0x10000 and splitting the
      // 20 bits of 0x0-0xFFFFF into two halves
      charcode =
        0x10000 + (((charcode & 0x3ff) << 10) | (str.charCodeAt(i) & 0x3ff));
      utf8.push(
        0xf0 | (charcode >> 18),
        0x80 | ((charcode >> 12) & 0x3f),
        0x80 | ((charcode >> 6) & 0x3f),
        0x80 | (charcode & 0x3f)
      );
    }
  }
  return utf8;
}
/* eslint-enable no-bitwise */

const adler32 = (str) => {
  const prime = 65521;
  let s1 = 1;
  let s2 = 0;

  const bytes = toUTF8Array(str);

  for (let i = 0; i < bytes.length; i += 1) {
    const b = bytes[i];
    s1 += b;
    s2 += s1;
  }

  s1 %= prime;
  s2 %= prime;

  // by default, JS uses signed 32 bit numbers. >>> 0 converts to unsigned
  // Lua uses unsigned so this makes it match the addon
  // eslint-disable-next-line no-bitwise
  return ((s2 << 16) >>> 0) + s1;
};

export const inputValidChecksum = (text) => {
  const lines = _.split(text, "\n");

  // check simc addon version
  const checksumLine = _.find(lines, (l) => l.match(CHECKSUM_REGEX));
  if (checksumLine) {
    const [, checksum] = checksumLine.match(CHECKSUM_REGEX);

    const origText = text.replace(checksumLine, "");

    const calculated = adler32(origText).toString(16);

    return calculated === checksum;
  }

  return false;
};

export const inputInfo = (text) => {
  if (text) {
    const simcMinVersion = SharedConfig.addon.simc.minVersion;
    const wowMinVersion = SharedConfig.addon.wow.minVersion;

    const lines = _.split(text, "\n");

    // check simc addon version
    const simcVersionLine = _.find(lines, (l) => l.match(SIMC_VERSION_REGEX));
    const raidbotsGeneratedLine = _.find(lines, (l) =>
      l.match(RAIDBOTS_GENERATED_REGEX)
    );
    const wowVersionLine = _.find(lines, (l) => l.match(WOW_VERSION_REGEX));

    const invalidChecksum = !inputValidChecksum(text);
    let invalidMainBodyChecksum = false;
    if (invalidChecksum) {
      // run the checksum again but from the start of the text until the checksum
      // this can determine if data has been added but kept the main body intact
      const checksumLineNum = _.findIndex(lines, (l) =>
        l.match(CHECKSUM_REGEX)
      );
      const mainBodyText = _.join(_.take(lines, checksumLineNum + 1), "\n");
      invalidMainBodyChecksum = !inputValidChecksum(mainBodyText);
    }

    if (simcVersionLine) {
      let version;
      let validVersion = true;
      let minVersionDiff;
      let versionError;

      const matches = simcVersionLine.match(SIMC_VERSION_REGEX);
      if (matches) {
        // THIS DROPS ALPHA/BETA/BUILD TAGS
        // This is intentional as the semver library explicitly does not allow prerelease comparisons across
        // major/minor/patch boundaries. For SimC addon, I just want to know about major/minor/patch
        const versionString = matches[1];
        version = semver.coerce(versionString);
        if (semver.valid(version)) {
          try {
            version = semver.coerce(versionString);

            validVersion = semver.satisfies(version, `>= ${simcMinVersion}`);
            minVersionDiff = semver.diff(version, simcMinVersion);
            if (
              !validVersion &&
              _.includes(["premajor", "preminor", "prerelease"], minVersionDiff)
            ) {
              validVersion = true;
            }
          } catch (error) {
            versionError = error.message;
            validVersion = false;
          }

          let wowVersion;
          let wowVersionValid;
          let wowVersionStr;

          if (wowVersionLine) {
            [, wowVersionStr] = wowVersionLine.match(WOW_VERSION_REGEX);
            wowVersion = semver.coerce(wowVersionStr);
            wowVersionValid = semver.satisfies(
              wowVersion,
              `>= ${wowMinVersion}`
            );
          }

          const result = {
            source: "simc-addon",
            version: version?.version,
            versionRaw: versionString,
            versionDetails: JSON.parse(JSON.stringify(version)), // make into a plain object
            minVersion: simcMinVersion,
            minVersionDiff,
            validVersion,
            validSource: true,
            versionError,
            invalidChecksum,
            invalidMainBodyChecksum,
            wowVersion: wowVersionStr,
            wowVersionDetails: wowVersion,
            wowVersionValid,
          };
          return result;
        }
      }
    } else if (raidbotsGeneratedLine) {
      return {
        source: "raidbots",
        version: null,
        minVersion: simcMinVersion,
        validVersion: true,
        validSource: true,
      };
    }
    return {
      source: "unknown",
      version: null,
      minVersion: simcMinVersion,
      validVersion: false,
      validSource: false,
    };
  }
  return null;
};
