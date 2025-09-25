// forge.config.ts
import path from 'path'
import { FusesPlugin } from '@electron-forge/plugin-fuses';
import { FuseV1Options, FuseVersion } from '@electron/fuses';
import type { ForgeConfig } from '@electron-forge/shared-types';

const config: ForgeConfig = {
  publishers: [
    {
      name: '@electron-forge/publisher-github',
      config: {
        repository: {
          owner: 'yuridiasp',
          name: 'Projeto-ISGenerateApp',
        },
        draft: false,
        prerelease: false,
        generateReleaseNotes: true,
        authToken: process.env.GITHUB_TOKEN
      },
    }
  ],
  packagerConfig: {
    asar: true,
    extraResource: [path.resolve(__dirname, ".env")],
  },
  rebuildConfig: {},
  makers: [
    {
      name: '@electron-forge/maker-squirrel',
      platforms: ['win32'], // alvo para Windows
      config: {
        authors: 'Yuri Dias Pereira Gomes',
        // opcional: name, setupIcon, iconUrl, certificateFile, etc.
      },
    },
    {
      name: '@electron-forge/maker-zip',
      platforms: ['darwin'], // macOS
      config: {},
    },
    {
      name: '@electron-forge/maker-deb',
      platforms: ['linux'],
      config: {},
    },
    {
      name: '@electron-forge/maker-rpm',
      platforms: ['linux'],
      config: {},
    },
  ],
  plugins: [
    {
      name: '@electron-forge/plugin-auto-unpack-natives',
      config: {},
    },
    // Fuses are used to enable/disable various Electron functionality
    // at package time, before code signing the application
    new FusesPlugin({
      version: FuseVersion.V1,
      [FuseV1Options.RunAsNode]: false,
      [FuseV1Options.EnableCookieEncryption]: true,
      [FuseV1Options.EnableNodeOptionsEnvironmentVariable]: false,
      [FuseV1Options.EnableNodeCliInspectArguments]: false,
      [FuseV1Options.EnableEmbeddedAsarIntegrityValidation]: true,
      [FuseV1Options.OnlyLoadAppFromAsar]: true,
    }),
  ],
};

export default config;
