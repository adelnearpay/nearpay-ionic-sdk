import { WebPlugin } from '@capacitor/core';

import type { NearpayPluginPlugin } from './definitions';

export class NearpayPluginWeb extends WebPlugin implements NearpayPluginPlugin {
  async echo(options: { value: string }): Promise<{ value: string }> {
    console.log('ECHO', options);
    return options;
  }
}
