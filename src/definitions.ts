export interface NearpayPluginPlugin {
  echo(options: { value: string }): Promise<{ value: string }>;
}
