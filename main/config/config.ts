
import { defineConfig } from '@umijs/max';
import qiankun from './qiankun';
import routes from './routes';
export default defineConfig({
  antd: {},
  access: {},
  model: {},
  initialState: {},
  request: {},
  layout: {
    title: 'micro-app'
  },
  base: '/',
  qiankun,
  routes,
  npmClient: 'pnpm'
})