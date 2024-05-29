import { defineConfig } from '@umijs/max';
import path from 'path';

// https://umijs.org/docs/guides/env-variables
// Umi 不支持 .env.development / .env.production 的环境变量配置文件
export default defineConfig({
  define: {
    'process.env': process.env,
  },
  base: '/react',
  publicPath: '/react/',
  outputPath:
    process.env.APP_ENV === 'dev'
      ? '/'
      : path.join(__dirname, '../build/child/react'),
  antd: {
    configProvider: {
      prefixCls: 'react',
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
