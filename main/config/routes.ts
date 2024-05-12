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
    path: '/vite-project',
    routes: [
      {
        name: 'vite-project-home',
        path: '/vite-project/home',
        microApp: 'vite-project',
        microAppProps: {
          autoSetLoading: true,
        },
      },
      {
        name: 'vite-project-about',
        path: '/vite-project/about',
        microApp: 'vite-project',
        microAppProps: {
          autoSetLoading: true,
        },
      },
      {
        name: 'vite-project-home',
        path: '/vite-project/*',
        microApp: 'vite-project',
        microAppProps: {
          autoSetLoading: true,
        },
        hideInMenu: true,
      },
    ],
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
