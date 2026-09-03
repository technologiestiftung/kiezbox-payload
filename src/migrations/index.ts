import * as migration_20260903_090228 from './20260903_090228';
import * as migration_20260903_105841 from './20260903_105841';

export const migrations = [
  {
    up: migration_20260903_090228.up,
    down: migration_20260903_090228.down,
    name: '20260903_090228',
  },
  {
    up: migration_20260903_105841.up,
    down: migration_20260903_105841.down,
    name: '20260903_105841'
  },
];
