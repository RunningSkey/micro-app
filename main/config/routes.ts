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
    name: '主应用页面',
    path: '/table',
    component: './Table',
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
