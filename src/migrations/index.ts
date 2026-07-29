import * as migration_20260729_094816 from './20260729_094816';
import * as migration_20260729_122258 from './20260729_122258';

export const migrations = [
  {
    up: migration_20260729_094816.up,
    down: migration_20260729_094816.down,
    name: '20260729_094816',
  },
  {
    up: migration_20260729_122258.up,
    down: migration_20260729_122258.down,
    name: '20260729_122258'
  },
];
