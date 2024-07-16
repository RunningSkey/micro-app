import { MICRO_APPS } from './constants';
import { jsonParse } from './utils';

export type MicroAppItem = {
  name: string;
  origin: string;
  base: string;
  qiankunBase: string;
  routes: Route[];
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
  routes?: Route[],
): Route[] | undefined => {
  if (!Array.isArray(routes) || routes.length === 0) {
    return undefined;
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
  return result.length > 0 ? result : undefined;
};
export const getMicroApps = () => {
  const defaultValue = [
    {
      name: 'vite-project',
      /** 子应用独立访问origin地址 */
      origin: '//localhost:9002',
      /** 子应用独立访问路由base地址 */
      base: '/vite-project',
      /** 告知子应用在qiankun环境下的路由前缀 */
      qiankunBase: '/child1',
      routes: [
        {
          name: 'vite-project-root',
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
    {
      name: 'react',
      /** 子应用独立访问origin地址 */
      origin: '//localhost:9001',
      /** 子应用独立访问路由base地址 */
      base: '/react',
      /** 告知子应用在qiankun环境下的路由前缀 */
      qiankunBase: '/child2',
      routes: [
        {
          name: 'react-root',
          path: '/',
          routes: [
            {
              name: 'react-home',
              path: '/home',
            },
            {
              name: 'react-access',
              path: '/access',
            },
            {
              name: 'react-table',
              path: '/table',
            },
            {
              name: 'react-多层级',
              path: '/demo/',
              routes: [
                {
                  name: 'react-多层级-权限演示',
                  path: '/demo/access',
                },
                {
                  name: 'react-多层级-CRUD 示例',
                  path: '/demo/table',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: 'vue2',
      /** 子应用独立访问origin地址 */
      origin: '//localhost:9003',
      /** 子应用独立访问路由base地址 */
      base: '/vue2',
      /** 告知子应用在qiankun环境下的路由前缀 */
      qiankunBase: '/child3',
      routes: [
        {
          name: 'vue2-root',
          path: '/',
          routes: [
            {
              name: 'vue2_dashboard',
              path: '/dashboard',
            },
            {
              name: 'vue2' + '_example',
              path: '/example/',
              routes: [
                {
                  name: 'vue2_example_table',
                  path: '/example/table',
                },
                {
                  name: 'vue2_example_tree',
                  path: '/example/tree',
                },
              ],
            },
            {
              name: 'vue2_form',
              path: '/form/index',
            },
          ],
        },
      ],
    },
  ].map((item) => ({
    ...item,
    origin: process.env.APP_ENV === 'prod' ? '//localhost:4000' : item.origin,
    routes: formatMicroRoutes(item.qiankunBase, item.base, item.routes),
  }));
  const resValue = jsonParse(localStorage.getItem(MICRO_APPS), defaultValue);
  localStorage.setItem(MICRO_APPS, JSON.stringify(resValue));
  return resValue;
};
