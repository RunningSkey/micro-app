const routes = [
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/login',
    component: './Login',
    layout: false,
  },
  {
    name: '首页',
    path: '/home',
    component: './Home',
  },
  {
    name: '子应用列表',
    path: '/table',
    component: './Table',
  },
  {
    name: 'vite-project',
    path: '/child/vite-project/*',
    microApp: 'vite-project',
    microAppProps: {
      autoSetLoading: true,
    },
    hideInMenu: true,
  },
  {
    name: 'react',
    path: '/child/react/*',
    microApp: 'react',
    microAppProps: {
      autoSetLoading: true,
    },
    hideInMenu: true,
  },
  {
    name: 'vue2',
    path: '/child/vue2/*',
    microApp: 'vue2',
    microAppProps: {
      autoSetLoading: true,
    },
    hideInMenu: true,
  },
  {
    name: '404',
    path: '*',
    component: './404',
    hideInMenu: true,
    layout: false,
  },
];

export default routes;
