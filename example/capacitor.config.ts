import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.nearpay.ionic.plugin',
  appName: 'example',
  webDir: 'dist',
  server: {
    androidScheme: 'https',
  },
};

export default config;
