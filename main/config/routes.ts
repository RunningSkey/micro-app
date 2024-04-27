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
  // {
  //   name: 'vue-admin-template',
  //   path: '/vue-admin-template',
  //   routes: [
  //     {
  //       name: 'Form',
  //       path: '/vue-admin-template/form/index',
  //       microApp: 'vue-admin-template',
  //     },
  //     {
  //       name: 'Example',
  //       path: '/vue-admin-template/example',
  //       microApp: 'vue-admin-template',
  //       routes: [
  //         {
  //           name: 'table',
  //           path: '/vue-admin-template/example/table',
  //           microApp: 'vue-admin-template',
  //         },
  //         {
  //           name: 'tree',
  //           path: '/vue-admin-template/example/tree',
  //           microApp: 'vue-admin-template',
  //         },
  //       ],
  //     },
  //     {
  //       path: '/vue-admin-template/*',
  //       microApp: 'vue-admin-template',
  //     },
  //   ],
  // },
  {
    name: '404',
    path: '*',
    component: './404',
    hideInMenu: true,
    layout: false,
  },
];

export default routes;
