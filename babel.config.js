module.exports = {
    presets: [
      [ '@babel/preset-env', {targets: {node: 'current'}} ],
      '@babel/preset-typescript',
    ],
    plugins: [
      ['module-resolver', {
        root: ['./src'],
        alias: {
          "@channels": "./src/channels",
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