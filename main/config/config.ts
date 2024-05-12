import { defineConfig } from '@umijs/max';
import path from 'path';
import routes from './routes';
console.log(process.env.APP_ENV, 'APP_ENV');
export default defineConfig({
  define: {
    'process.env': process.env,
  },
  publicPath: process.env.APP_ENV === 'dev' ? '/' : './',
  outputPath:
    process.env.APP_ENV === 'dev'
      ? '/'
      : path.resolve(__dirname, '../../build'),
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
