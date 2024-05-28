import { APP_TYPE, MICRO_APPS } from './constants';
import { jsonParse } from './utils';

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

export type Route = {
  name: string;
  path: string;
  routes?: Route[];
  children?: Route[];
};
const formatMicroRoutes = (
  qiankunBase: string,
  base: string,
  routes: Route[],
): Route[] => {
  if (!Array.isArray(routes) || routes.length === 0) {
    return [];
  }
  const result: Route[] = [];
  for (let item of routes) {
    const formattedItem: Route = {
      name: item.name,
      path: `${qiankunBase}${base}${item.path}`,
      routes: formatMicroRoutes(qiankunBase, base, item.routes || []),
    };
    result.push(formattedItem);
  }
  return result;
};
export const getMicroApps = () => {
  const defaultValue = [
    {
      name: 'vite-project',
      /** 子应用独立访问origin地址 */
      origin: '//localhost:4000',
      /** 子应用独立访问路由base地址 */
      base: '/vite-project',
      /** 告知子应用在qiankun环境下的路由前缀 */
      qiankunBase: '/child',
      routes: [
        {
          name: 'vite-project',
          path: '/',
          routes: [
            {
              name: 'vite-project-home',
              path: '/home',
            },
            {
              name: 'vite-project-about',
              path: '/about',
            },
            {
              name: 'vite-project-menu',
              path: '/menu/',
              routes: [
                {
                  name: 'vite-project-menu-item-1',
                  path: '/menu/menu-item-1',
                },
                {
                  name: 'vite-project-menu-item-2',
                  path: '/menu/menu-item-2',
                },
              ],
            },
          ],
        },
      ],
    },
  ].map((item) => ({
    ...item,
    routes: formatMicroRoutes(item.qiankunBase, item.base, item.routes),
  }));
  const resValue = jsonParse(localStorage.getItem(MICRO_APPS), defaultValue);
  localStorage.setItem(MICRO_APPS, JSON.stringify(resValue));
  return resValue;
};
