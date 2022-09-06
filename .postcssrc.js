const pxTORem = require('postcss-pxtorem')
module.exports = {
  plugins: [
    pxTORem({
      rootValue: ({ file }) => (/vant/.test(file) ? 37.5 : 75),
      propList: ['*']
    })
  ]
}
