import { defineConfig } from '@umijs/max';
import routes from './routes';
export default defineConfig({
  antd: {},
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
  routes,
  npmClient: 'pnpm',
});
