export default {
    presets: [
      [ '@babel/preset-env', { targets: {electron: '38.1.1'} } ],
      '@babel/preset-typescript',
    ],
    sourceMaps: "inline",
    plugins: [
      ['module-resolver', {
        root: ['./src'],
        alias: {
          "@channels": "./src/channels",
          "@config": "./src/config",
          "@controllers": "./src/controllers",
          "@helpers": "./src/helpers",
          "@infrastructure": "./src/infrastructure",
          "@middlewares": "./src/middlewares",
          "@models": "./src/models",
          "@renderer": "./src/renderer/",
          "@repositories": "./src/repositories",
          "@services": "./src/services",
          "@utils": "./src/utils"
        }
      }]
    ]
  };