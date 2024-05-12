import { APP_TYPE } from './constants';

export const getMicroReactApp = (appName: string, appEntry?: string) => {
  return {
    appName: appName,
    appEntry: appEntry || '//localhost:8001',
    appType: APP_TYPE.DYNAMIC.value,
    appRoutes: [
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
    appType: APP_TYPE.DYNAMIC.value,
    appRoutes: [
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
