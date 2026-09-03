import * as migration_20260903_090228 from './20260903_090228';
import * as migration_20260903_105841 from './20260903_105841';
import * as migration_20260903_122959 from './20260903_122959';
import * as migration_20260903_130100 from './20260903_130100';
import * as migration_20260903_131500 from './20260903_131500';

export const migrations = [
  {
    up: migration_20260903_090228.up,
    down: migration_20260903_090228.down,
    name: '20260903_090228',
  },
  {
    up: migration_20260903_105841.up,
    down: migration_20260903_105841.down,
    name: '20260903_105841',
  },
  {
    up: migration_20260903_122959.up,
    down: migration_20260903_122959.down,
    name: '20260903_122959',
  },
  {
    up: migration_20260903_130100.up,
    down: migration_20260903_130100.down,
    name: '20260903_130100',
  },
  {
    up: migration_20260903_131500.up,
    down: migration_20260903_131500.down,
    name: '20260903_131500'
  },
];
