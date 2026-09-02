import * as migration_20260901_135753 from './20260901_135753';
import * as migration_20260902_092020 from './20260902_092020';

export const migrations = [
  {
    up: migration_20260901_135753.up,
    down: migration_20260901_135753.down,
    name: '20260901_135753',
  },
  {
    up: migration_20260902_092020.up,
    down: migration_20260902_092020.down,
    name: '20260902_092020'
  },
];
