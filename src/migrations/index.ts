import * as migration_20260729_094816 from './20260729_094816';
import * as migration_20260729_122258 from './20260729_122258';
import * as migration_20260729_124155 from './20260729_124155';
import * as migration_20260729_134018 from './20260729_134018';
import * as migration_20260730_065335 from './20260730_065335';
import * as migration_20260730_072538 from './20260730_072538';
import * as migration_20260730_073015 from './20260730_073015';
import * as migration_20260730_085601 from './20260730_085601';
import * as migration_20260730_093308 from './20260730_093308';
import * as migration_20260803_154939_two_column_open_source from './20260803_154939_two_column_open_source';
import * as migration_20260803_162217_open_source_reverse_columns from './20260803_162217_open_source_reverse_columns';
import * as migration_20260807_123130_remove_two_column_block from './20260807_123130_remove_two_column_block';
import * as migration_20260807_125117_open_source_media_columns from './20260807_125117_open_source_media_columns';

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
    name: '20260730_073015',
  },
  {
    up: migration_20260730_085601.up,
    down: migration_20260730_085601.down,
    name: '20260730_085601',
  },
  {
    up: migration_20260730_093308.up,
    down: migration_20260730_093308.down,
    name: '20260730_093308',
  },
  {
    up: migration_20260803_154939_two_column_open_source.up,
    down: migration_20260803_154939_two_column_open_source.down,
    name: '20260803_154939_two_column_open_source',
  },
  {
    up: migration_20260803_162217_open_source_reverse_columns.up,
    down: migration_20260803_162217_open_source_reverse_columns.down,
    name: '20260803_162217_open_source_reverse_columns',
  },
  {
    up: migration_20260807_123130_remove_two_column_block.up,
    down: migration_20260807_123130_remove_two_column_block.down,
    name: '20260807_123130_remove_two_column_block',
  },
  {
    up: migration_20260807_125117_open_source_media_columns.up,
    down: migration_20260807_125117_open_source_media_columns.down,
    name: '20260807_125117_open_source_media_columns'
  },
];
