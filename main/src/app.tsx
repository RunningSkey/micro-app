// 运行时配置

import { history, useModel } from '@umijs/max';
import { Skeleton } from 'antd';
import { useState } from 'react';
import './gloabl.less';
import { getMicroApps } from './serviceMicro';

// 全局初始化数据配置，用于 Layout 用户信息和权限初始化
// 更多信息见文档：https://umijs.org/docs/api/runtime-config#getinitialstate
export async function getInitialState(): Promise<{ name: string }> {
  console.log('getInitialState');
  // const { getUserInfo } = services.UserController;
  const userInfo = JSON.parse(
    localStorage.getItem('initialState') ||
      JSON.stringify({
        name: 'user',
        token: '12345',
        routes: [],
        settings: {
          navTheme: 'light',
          layout: 'mix',
          contentWidth: 'Fluid',
          fixedHeader: true,
          fixSiderbar: true,
          colorPrimary: '#1677FF',
          splitMenus: false,
        },
      }),
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

// const staticApps = [
//   // {
//   //   entry: '//localhost:4000/vite-project/',
//   //   name: 'vite-project',
//   // },
//   // {
//   //   entry: '//localhost:4000/react/',
//   //   name: 'react',
//   // },
//   // {
//   //   entry: '//localhost:4000/vue2/',
//   //   name: 'vue2',
//   // },
// ];
const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

/** 动态qiankun配置 */
export const qiankun = (async () => {
  await waitTime();
  const microApp = await getMicroApps();
  return {
    master: {
      apps: [
        // ...staticApps,
        ...microApp.map((it) => {
          return {
            entry: it.origin + it.base + '/',
            name: it.name,
          };
        }),
      ],
      routes: microApp.map((item) => {
        return {
          name: item.name,
          path: `${item.qiankunBase}${item.base}/*`,
          microApp: item.name,
          microAppProps: {
            autoCaptureError: true,
            autoSetLoading: true,
            loader: (loading: boolean) =>
              loading && (
                <Skeleton
                  title={{
                    width: '100%',
                  }}
                />
              ),
            qiankunBase: item.qiankunBase,
          },
          hideInMenu: true,
        };
      }),
      lifeCycles: {
        beforeMount: (app) => {
          console.log('before mount', app);
          // 可以在这里添加逻辑，例如清除缓存
        },
        afterMount: (app) => {
          console.log('after mount', app);
          // 可以在这里触发更新逻辑
        },
      },
    },
  };
})();

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
