// console.log('-------------------------------')
// console.log(process.env.NODE_ENV)
// console.log(process.env.SHARINGAN_PROJECT_MODE)
// console.log('-------------------------------')
let baseConfig = {
  lintOnSave: false
  // configureWebpack: {
  //   devtool: 'source-map'
  // }
  // publicPath: './',
}

let webConfig = {
  ...baseConfig,
  outputDir: 'dist/web',
  pages: {
    index: {
      // page 的入口
      entry: 'src/web/main.ts',
      // 模板来源
      template: 'public/web/index.html',
      // 在 dist/index.html 的输出
      filename: 'index.html'
    }
  }
}

let mobileConfig = {
  ...baseConfig,
  outputDir: 'dist/mobile',
  pages: {
    index: {
      // page 的入口
      entry: 'src/mobile/main.ts',
      // 模板来源
      template: 'public/mobile/index.html',
      // 在 dist/index.html 的输出
      filename: 'index.html'
    }
  }
}

let dualConfig = {
  ...baseConfig,
  pages: {
    index: {
      // page 的入口
      entry: 'src/web/main.ts',
      // 模板来源
      template: 'public/web/index.html',
      // 在 dist/index.html 的输出
      filename: 'index.html'
    },
    mobile: {
      // page 的入口
      entry: 'src/mobile/main.ts',
      // 模板来源
      template: 'public/mobile/index.html',
      // 在 dist/index.html 的输出
      filename: 'mobile/index.html'
    }
  }
}

// let exportsConfig
// switch (process.env.SHARINGAN_PROJECT_MODE) {
//   case 'dual':
//     exportsConfig = dualConfig
//     break
//   case 'web':
//     exportsConfig = webConfig
//     break
//   case 'mobile':
//     exportsConfig = mobileConfig
//     break
//   default:
//     exportsConfig = baseConfig
// }
// module.exports = exportsConfig

module.exports = {
  outputDir: 'dist/web',
  pages: {
    index: {
      // page 的入口
      entry: 'src/web/main.ts',
      // 模板来源
      template: 'public/index.html',
      // 在 dist/index.html 的输出
      filename: 'index.html'
    },
    mobile: {
      // page 的入口
      entry: 'src/web/mobileMain.ts',
      // 模板来源
      template: 'public/mobile.html',
      // 在 dist/index.html 的输出
      filename: 'mobile.html'
    }
  }
}
