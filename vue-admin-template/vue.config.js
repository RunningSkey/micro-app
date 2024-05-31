"use strict";
const path = require("path");
const defaultSettings = require("./src/settings.js");
// const { name } = require("./package.json");
const name = "vue2";
function resolve(dir) {
  return path.join(__dirname, dir);
}

// const name = defaultSettings.title || "vue Admin Template"; // page title

// If your port is set to 80,
// use administrator privileges to execute the command line.
// For example, Mac: sudo npm run
// You can change the port by the following methods:
// port = 9528 npm run dev OR npm run dev --port = 9528
const port = process.env.PORT || process.env.npm_config_port || 9528; // dev port

// All configuration item explanations can be find in https://cli.vuejs.org/config/
module.exports = {
  /**
   * You will need to set publicPath if you plan to deploy your site under a sub path,
   * for example GitHub Pages. If you plan to deploy your site to https://foo.github.io/bar/,
   * then publicPath should be set to "/bar/".
   * In most cases please use '/' !!!
   * Detail: https://cli.vuejs.org/config/#publicpath
   */
  //对应nginx的目录
  publicPath: "/vue2/",
  outputDir:
    process.env.NODE_ENV === "development"
      ? resolve("/dist")
      : resolve("../build/child/vue2"),
  assetsDir: "static",
  lintOnSave: process.env.NODE_ENV === "development",
  productionSourceMap: false, //不打包 .map文件
  devServer: {
    port: port,
    // open: true,
    overlay: {
      warnings: false,
      errors: true,
    },
    before: require("./mock/mock-server.js"),
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  },
  configureWebpack: {
    // provide the app's title in webpack's name field, so that
    // it can be accessed in index.html to inject the correct title.
    name: name,
    resolve: {
      alias: {
        "@": resolve("src"),
      },
    },
    output: {
      library: `${name}-[name]`,
      libraryTarget: "umd",
      // chunkLoadingGlobal: `webpackJsonp_${name}`,
      jsonpFunction: `webpackJsonp_${name}`,
      globalObject: "window",
    },
  },
  chainWebpack(config) {
    if (process.env.NODE_ENV === "production") {
      // config.plugin("compressionPlugin").use(
      //   new CompressionPlugin({
      //     filename: "[path].gz[query]",
      //     algorithm: "gzip",
      //     test: productionGzipExtensions,
      //     threshold: 10240, // 对超过10k的数据压缩
      //     minRatio: 0.8,
      //     deleteOriginalAssets: true,
      //   })
      // );
    }
    // it can improve the speed of the first screen, it is recommended to turn on preload
    config.plugin("preload").tap(() => [
      // 打开预加载,它可以提高第一个屏幕的速度
      {
        rel: "preload", //异步预加载
        // to ignore runtime.js
        // https://github.com/vuejs/vue-cli/blob/dev/packages/@vue/cli-service/lib/config/app.js#L171
        fileBlacklist: [/\.map$/, /hot-update\.js$/, /runtime\..*\.js$/], //文件黑名单
        include: "initial",
      },
    ]);

    // when there are many pages, it will cause too many meaningless requests
    config.plugins.delete("prefetch"); //异步闲时加载 配合路由懒加载

    // set svg-sprite-loader
    config.module.rule("svg").exclude.add(resolve("src/icons")).end();
    config.module
      .rule("icons")
      .test(/\.svg$/)
      .include.add(resolve("src/icons"))
      .end()
      .use("svg-sprite-loader")
      .loader("svg-sprite-loader")
      .options({
        symbolId: "icon-[name]",
      })
      .end();

    config.when(process.env.NODE_ENV !== "development", (config) => {
      config
        .plugin("ScriptExtHtmlWebpackPlugin")
        .after("html")
        .use("script-ext-html-webpack-plugin", [
          {
            // `runtime` must same as runtimeChunk name. default is `runtime`
            inline: /runtime\..*\.js$/,
          },
        ])
        .end();
      config.optimization.splitChunks({
        chunks: "all",
        cacheGroups: {
          libs: {
            name: "chunk-libs",
            test: /[\\/]node_modules[\\/]/,
            priority: 10,
            chunks: "initial", // only package third parties that are initially dependent
          },
          elementUI: {
            name: "chunk-elementUI", // split elementUI into a single package
            priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
            test: /[\\/]node_modules[\\/]_?element-ui(.*)/, // in order to adapt to cnpm
          },
          commons: {
            name: "chunk-commons",
            test: resolve("src/components"), // can customize your rules
            minChunks: 3, //  minimum common number代码切割之前的最小共用数量
            priority: 5,
            reuseExistingChunk: true,
          },
        },
      });
      // https:// webpack.js.org/configuration/optimization/#optimizationruntimechunk
      config.optimization.runtimeChunk("single");
      //runtimeChunk作用是为了线上更新版本时，充分利用浏览器缓存，使用户感知的影响到最低。
    });
  },
};
