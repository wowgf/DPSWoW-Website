import _ from "lodash";
import levenshtein from "fast-levenshtein";

const rawRealms = {};

const unifiedRealms = [];

_.each(rawRealms, (data, origin) => {
  _.each(data, (realm) =>
    unifiedRealms.push({
      ...realm,
      id: `${origin}/${realm.slug}`,
      origin,
    })
  );
});

export const REALMS = unifiedRealms;

export const find = (regionSearch, realmSearch) => {
  // search for the exact name
  const exactMatch = _.find(rawRealms[regionSearch], { name: realmSearch });
  if (exactMatch) {
    return {
      ...exactMatch,
      distance: 0,
      exactMatch: true,
    };
  }

  // search for the exact slug
  const slugMatch = _.find(unifiedRealms, {
    origin: regionSearch,
    slug: realmSearch,
  });
  if (slugMatch) {
    return {
      ...slugMatch,
      distance: 0,
      exactMatch: true,
    };
  }

  // otherwise do a fuzzy search using levenshtein
  const normalizedSearch = _.toLower(_.replace(realmSearch, "_", "-"));
  const distances = _.sortBy(
    _.map(rawRealms[_.toLower(regionSearch)], (realm) => {
      // search for a name match in all the locale names
      const localeDistances = _.map(realm.names, (name) => {
        return levenshtein.get(normalizedSearch, _.toLower(name));
      });
      return {
        ...realm,
        distance: _.min(localeDistances),
      };
    }),
    "distance"
  );
  return distances[0];
};
