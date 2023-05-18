import { registerPlugin } from '@capacitor/core';

import type { NearpayPluginPlugin } from './definitions';

const NearpayPlugin = registerPlugin<NearpayPluginPlugin>('NearpayPlugin', {
  web: () => import('./web').then(m => new m.NearpayPluginWeb()),
});

export * from './definitions';
export { NearpayPlugin };
