import * as migration_20260729_094816 from './20260729_094816';
import * as migration_20260729_122258 from './20260729_122258';
import * as migration_20260729_124155 from './20260729_124155';
import * as migration_20260729_134018 from './20260729_134018';
import * as migration_20260730_065335 from './20260730_065335';
import * as migration_20260730_072538 from './20260730_072538';
import * as migration_20260730_073015 from './20260730_073015';

export const migrations = [
  {
    up: migration_20260729_094816.up,
    down: migration_20260729_094816.down,
    name: '20260729_094816',
  },
  {
    up: migration_20260729_122258.up,
    down: migration_20260729_122258.down,
    name: '20260729_122258',
  },
  {
    up: migration_20260729_124155.up,
    down: migration_20260729_124155.down,
    name: '20260729_124155',
  },
  {
    up: migration_20260729_134018.up,
    down: migration_20260729_134018.down,
    name: '20260729_134018',
  },
  {
    up: migration_20260730_065335.up,
    down: migration_20260730_065335.down,
    name: '20260730_065335',
  },
  {
    up: migration_20260730_072538.up,
    down: migration_20260730_072538.down,
    name: '20260730_072538',
  },
  {
    up: migration_20260730_073015.up,
    down: migration_20260730_073015.down,
    name: '20260730_073015'
  },
];
