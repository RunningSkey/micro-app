
const routes = [
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/login',
    component: './Login',
    layout: false
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
    name: 'app1',
    path: '/app1',
    routes: [
      {
        path: '/app1/*',
        microApp: 'app1',
        microAppProps: {
          autoSetLoading: true
        }
      }
    ]
  }
];

export default routes;
