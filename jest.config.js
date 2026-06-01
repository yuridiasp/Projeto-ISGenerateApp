module.exports = {
  transform: {
    "^.+\\.[cm]?[tj]sx?$": "babel-jest"
  },
  transformIgnorePatterns: ["/node_modules/(?!(@exodus|parse5|entities|@asamuzakjp|@csstools)/)"]
}
