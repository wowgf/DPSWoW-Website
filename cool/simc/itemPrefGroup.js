import _ from 'lodash';
import {
  classIdMap,
  getSpecsByMainStat,
} from './character';

const prefGroup = {
  all: { roles: ['melee', 'caster', 'ranged', 'tank', 'healer'] },
  notRanged: { roles: ['melee', 'caster', 'tank', 'healer'] },
  meleeRange: { roles: ['melee', 'tank'] },
  melee: { roles: ['melee'] },
  healer: { roles: ['healer'] },
  tank: { roles: ['tank'] },
  ranged: { roles: ['ranged'] },
  caster: { roles: ['caster'] },
  agi: { specs: _.map(getSpecsByMainStat('agi'), 'id') },
  int: { specs: _.map(getSpecsByMainStat('int'), 'id') },
  str: { specs: _.map(getSpecsByMainStat('str'), 'id') },
  agistr: {
    specs: _.concat(
      _.map(getSpecsByMainStat('agi'), 'id'),
      _.map(getSpecsByMainStat('str'), 'id'),
    ),
  },
  hunter: { classes: [classIdMap.Hunter] },
  deathknight: { classes: [classIdMap['Death Knight']] },
  deathknight2h: { classes: [classIdMap['Death Knight']], hands: '2h' },
};

export default prefGroup;
