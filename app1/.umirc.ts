import { defineConfig } from '@umijs/max';
console.log(process.env.APP_ENV, 'process.env.BASE_URL');

export default defineConfig({
  publicPath: process.env.APP_ENV === 'dev' ? '/' : '../dist/',
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
