import { defineConfig } from '@umijs/max';
import path from 'path';
console.log(process.env.APP_ENV, 'process.env.APP_ENV');

export default defineConfig({
  define: {
    'process.env': process.env,
  },
  publicPath: process.env.APP_ENV === 'dev' ? '/' : './',
  outputPath:
    process.env.APP_ENV === 'dev'
      ? '/'
      : path.resolve(__dirname, '../build/app1'),
  antd: {
    configProvider: {
      prefixCls: 'app1',
    },
  },
  access: {},
  model: {},
  initialState: {},
  request: {},
  layout: {
    title: '@umijs/max',
  },
  qiankun: {
    slave: {},
  },
  routes: [
    {
      path: '/',
      redirect: '/home',
    },
    {
      name: '首页',
      path: '/home',
      component: './Home',
    },
    {
      name: '权限演示',
      path: '/access',
      component: './Access',
    },
    {
      name: ' CRUD 示例',
      path: '/table',
      component: './Table',
    },
    {
      name: '多层级',
      path: '/demo',
      routes: [
        {
          name: '权限演示',
          path: '/demo/access',
          component: './Access',
        },
        {
          name: ' CRUD 示例',
          path: '/demo/table',
          component: './Table',
        },
      ],
    },
  ],
  npmClient: 'pnpm',
});
