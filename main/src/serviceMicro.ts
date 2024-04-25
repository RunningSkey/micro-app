export const getMicroReactApp = (appName: string, appEntry?: string) => {
  return {
    appName: appName,
    appEntry: appEntry || '//localhost:8001',
    appRoutes: [
      // {
      //   name: appName + 'question',
      //   path: '/' + 'theone' + '/question',
      // },
      {
        name: appName + '_home',
        path: '/' + appName + '/home',
      },
      {
        name: appName + '_access',
        path: '/' + appName + '/access',
      },
      {
        name: appName + '_table',
        path: '/' + appName + '/table',
      },
      {
        name: '多层级',
        path: '/' + appName + '/demo',
        redirect: '/' + appName + '/demo/table',
        children: [
          {
            name: ' CRUD 示例',
            path: '/' + appName + '/demo/table',
          },
        ],
      },
    ],
  };
};

export const getMicroVueApp = (appName: string, appEntry?: string) => {
  return {
    appName: appName,
    appEntry: appEntry || '//localhost:9528',
    appRoutes: [
      // {
      //   name: appName + 'question',
      //   path: '/' + 'theone' + '/question',
      // },
      {
        name: appName + '_dashboard',
        path: '/' + appName + '/dashboard',
      },
      {
        name: appName + '_example',
        path: '/' + appName + '/example',
        children: [
          {
            name: appName + '_example_table',
            path: '/' + appName + '/example/table',
          },
          {
            name: appName + '_example_tree',
            path: '/' + appName + '/example/tree',
          },
        ],
      },
      {
        name: appName + '_form',
        path: '/' + appName + '/form/index',
      },
    ],
  };
};
