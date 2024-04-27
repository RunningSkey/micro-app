import { defineConfig } from '@umijs/max';
import routes from './routes';
export default defineConfig({
  antd: {
    configProvider: {
      prefixCls: 'yourPrefix',
    },
    // lessLoader: {
    //   loader: 'less-loader',
    //   options: {
    //     modifyVars: {
    //       '@ant-prefix': 'yourPrefix',
    //     },
    //     javascriptEnabled: true,
    //   },
    // },
  },
  // lessLoader: {
  //   modifyVars: {
  //     '@ant-prefix': 'yourPrefix',
  //   },
  //   javascriptEnabled: true,
  // },
  access: {},
  model: {},
  initialState: {},
  request: {},
  layout: {
    title: 'micro-app',
  },
  base: '/',
  qiankun: {
    master: {},
  },
  proxy: {
    '/dev-api': {
      target: 'http://localhost:9528',
      changeOrigin: true,
      pathRewrite: { '^/api': '' },
    },
    // '/#/dashboard': {
    //   target: 'http://localhost:8002',
    //   changeOrigin: true,
    //   // pathRewrite: { '^/api': '' },
    // },
  },
  routes,
  npmClient: 'pnpm',
});
