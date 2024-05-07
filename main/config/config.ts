import { defineConfig } from '@umijs/max';
import routes from './routes';
console.log(process.env.APP_ENV, 'APP_ENV');

export default defineConfig({
  // publicPath: '/',
  define: {
    'process.env': process.env,
  },
  publicPath: process.env.APP_ENV === 'dev' ? '/' : '../../main/dist/',
  antd: {
    configProvider: {
      prefixCls: 'main',
    },
  },
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
  },
  routes,
  npmClient: 'pnpm',
});
