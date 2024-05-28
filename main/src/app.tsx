// 运行时配置

import { RuntimeConfig, history, useModel } from '@umijs/max';
import { Button, Space } from 'antd';
import { useState } from 'react';
import routes from '../config/routes';
import { MICRO_APPS } from './constants';
import { Route, getMicroApps } from './serviceMicro';

// 全局初始化数据配置，用于 Layout 用户信息和权限初始化
// 更多信息见文档：https://umijs.org/docs/api/runtime-config#getinitialstate
export async function getInitialState(): Promise<{ name: string }> {
  console.log('getInitialState');
  // const { getUserInfo } = services.UserController;
  const userInfo = JSON.parse(
    localStorage.getItem('initialState') ||
      '{"name":"user","token":"12345","routes":[]}',
  );
  // const data = await getUserInfo({
  //   name: userInfo.name,
  //   token: userInfo.token,
  // }).catch(() => {
  //   if (location.pathname !== '/login')
  //     history.push('/login?redirect=' + encodeURIComponent(location.href));
  // });
  // if (!data.success) {
  //   if (location.pathname !== '/login')
  //     history.push('/login?redirect=' + encodeURIComponent(location.href));
  // }
  localStorage.setItem('initialState', JSON.stringify(userInfo));
  return { ...userInfo };
}

const staticApps = [
  // {
  //   entry: '//localhost:4000/vite-project/',
  //   name: 'vite-project',
  // },
  {
    entry: '//localhost:4000/react/',
    name: 'react',
  },
  {
    entry: '//localhost:4000/vue2/',
    name: 'vue2',
  },
];
let microMenu: Route[] = [];

/** 动态qiankun配置 */
export const qiankun = (async () => {
  const microApp = await getMicroApps();
  return {
    master: {
      apps: [
        ...staticApps,
        ...microApp.map((it) => {
          return {
            entry: it.origin + it.base + '/',
            name: it.name,
          };
        }),
      ],
      routes: microApp.map((item) => {
        microMenu.push(...item.routes);
        return {
          name: item.name,
          path: `${item.qiankunBase}${item.base}/*`,
          microApp: item.name,
          microAppProps: {
            autoCaptureError: true,
            autoSetLoading: true,
            qiankunBase: item.qiankunBase,
          },
          hideInMenu: true,
        };
      }),
    },
  };
})();

const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};
export const layout: RuntimeConfig['layout'] = () => {
  return {
    logo: 'https://img.alicdn.com/tfs/TB1YHEpwUT1gK0jSZFhXXaAtVXa-28-27.svg',
    menu: {
      locale: false,
      request: async () => {
        await waitTime();
        console.log(microMenu, 'microMenu');

        return (
          routes
            //@ts-ignore
            .concat(microMenu)
            .concat([
              {
                name: 'react',
                path: '/child/react/',
                routes: [
                  {
                    name: 'react-access',
                    path: '/child/react/home',
                  },
                  {
                    name: 'react-access',
                    path: '/child/react/access',
                  },
                  {
                    name: 'react-table',
                    path: '/child/react/table',
                  },
                  {
                    name: 'react-多层级',
                    path: '/child/react/demo',
                    routes: [
                      {
                        name: 'react-多层级-权限演示',
                        path: '/child/react/demo/access',
                      },
                      {
                        name: 'react-多层级-CRUD 示例',
                        path: '/child/react/demo/table',
                      },
                    ],
                  },
                ],
              },
            ])
            .concat([
              {
                name: 'vue2',
                path: '/child/vue2/',
                routes: [
                  {
                    name: 'vue2' + '_dashboard',
                    path: '/child/' + 'vue2' + '/dashboard',
                  },
                  {
                    name: 'vue2' + '_example',
                    path: '/child/' + 'vue2' + '/example',
                    routes: [
                      {
                        name: 'vue2' + '_example_table',
                        path: '/child/' + 'vue2' + '/example/table',
                      },
                      {
                        name: 'vue2' + '_example_tree',
                        path: '/child/' + 'vue2' + '/example/tree',
                      },
                    ],
                  },
                  {
                    name: 'vue2' + '_form',
                    path: '/child/' + 'vue2' + '/form/index',
                  },
                ],
              },
            ])
        );
      },
    },
    breadcrumbProps: {
      separator: '>',
    },
    layout: 'mix',
    contentStyle: {
      padding: 0,
    },
    siderMenuType: 'sub',
    rightContentRender(_, dom) {
      return (
        <Space>
          <Button
            type="primary"
            onClick={() => {
              window.location.reload();
            }}
          >
            reload
          </Button>
          <Button
            type="primary"
            onClick={() => {
              localStorage.setItem(MICRO_APPS, '');
              window.location.reload();
            }}
          >
            初始化菜单信息
          </Button>
          {dom}
        </Space>
      );
    },
    logout() {
      history.push('/login');
    },
    links: [
      <a
        rel="noreferrer"
        target="_blank"
        key={1}
        href="https://github.com/RunningSkey/micro-app"
      >
        external-link
      </a>,
    ],
  };
};

export function useQiankunStateForSlave() {
  const mainInitialState = useModel('@@initialState');
  const [globalState, setGlobalState] = useState<any>({
    slogan: 'Hello MicroFrontend',
  });
  console.log(mainInitialState, 'mainInitialState');

  return {
    globalState,
    setGlobalState,
    mainInitialState: mainInitialState,
    masterHistory: history,
  };
}
// let extraRoutes: Route[] = [];
// export function patchClientRoutes({ routes }: { routes: Route[] }) {
//   console.log(routes, 'ttt');

//   // routes.forEach((item) => {
//   //   if (item.path === '/') {
//   //     const current = item.routes?.find((it) => it.path === '/');
//   //     if (!current) return;
//   //     current.routes = (current.routes || []).concat(
//   //       extraRoutes.map((it) => ({
//   //         ...it,
//   //       })),
//   //     );
//   //     current.children = (current.children || []).concat(
//   //       extraRoutes.map((it) => ({
//   //         ...it,
//   //         element: <MicroApp name={it.name} />,
//   //       })),
//   //     );
//   //   }
//   // });
// }

export function onRouteChange() {
  //后面通过获取子应用菜单 过滤跳转403 或 404
  console.log(location.pathname, 'location.pathname');
}

// export async function render(oldRender: any) {
//   console.log(oldRender, 'oldRender');
//   const microApp = getMicroApps();
//   //代理子应用全部路由
//   const extraMenu: Route[] = [];
//   extraRoutes = microApp.map((item) => {
//     extraMenu.push(...item.routes);
//     return {
//       name: item.name,
//       path: `${item.qiankunBase}${item.base}/*`,
//       microApp: item.name,
//       microAppProps: {
//         autoSetLoading: true,
//       },
//       hideInMenu: true,
//     };
//   });
//   microMenu = extraMenu;
//   oldRender();
// }
