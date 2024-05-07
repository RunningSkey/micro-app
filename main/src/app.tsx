// 运行时配置

import { MicroApp, RuntimeConfig, history, useModel } from '@umijs/max';
import { Button } from 'antd';
import { useState } from 'react';
import Layouts from './layouts';
import { getMicroReactApp, getMicroVueApp } from './serviceMicro';

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
/** 动态qiankun配置 */
export const qiankun = {
  master: {
    apps: [
      // {
      //   entry: '//localhost:9528',
      //   name: 'vue-admin-template',
      // },
      {
        entry: '//localhost:5173',
        name: 'vite-project',
      },
    ],
  },
};
export const layout: RuntimeConfig['layout'] = (initData) => {
  console.log(initData, 'initData');
  return {
    logo: 'https://img.alicdn.com/tfs/TB1YHEpwUT1gK0jSZFhXXaAtVXa-28-27.svg',
    menu: {
      locale: false,
    },
    breadcrumbProps: {
      separator: '>',
    },
    layout: 'mix',
    contentStyle: {
      padding: 0,
    },
    menuDataRender(menuData) {
      console.log(menuData, 'menuData');
      const microApp = {};
      menuData = menuData.filter((item) => {
        if (item.microApp) {
          if (microApp[item.microApp]) {
            microApp[item.microApp].push(item);
          } else {
            microApp[item.microApp] = [item];
          }
          return false;
        }
        return true;
      });
      Object.entries(microApp).forEach(([key, value]) => {
        menuData.push({
          name: key,
          path: '/' + key,
          routes: value,
        });
      });
      return menuData;
    },
    // itemRender(route) {
    //   console.log(route, 'ttt');

    //   return route;
    // },
    siderMenuType: 'sub',
    rightContentRender(_, dom) {
      return (
        <>
          <Button
            type="primary"
            onClick={() => {
              window.location.reload();
            }}
          >
            reload
          </Button>
          {dom}
        </>
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
let extraRoutes = [];
export function patchClientRoutes({ routes }) {
  console.log(routes, '11');
  routes.forEach((item) => {
    if (item.path === '/') {
      item.routes.push(...extraRoutes);
      // item.routes.push({
      //   name: 'app3',
      //   path: '/question',
      //   microApp: 'app3',
      // });
    }
  });
  console.log(routes, '222');
}

export function onRouteChange({ location }) {
  // console.log(location);
  // if (location.pathname === '/login') {
  //   localStorage.removeItem('initialState');
  // }
}

export async function render(oldRender) {
  console.log('render-----');
  const data = await new Promise((reslove) => {
    setTimeout(() => {
      reslove([
        getMicroReactApp('react1'),
        getMicroReactApp('react2'),
        getMicroVueApp('vue1'),
        getMicroVueApp('vue2'),
      ]);
    }, 1000);
  });
  const routes = [];
  data.forEach((item) => {
    qiankun.master.apps.push({
      entry: item.appEntry,
      name: item.appName,
    });
    item.appRoutes.forEach((i) => {
      routes.push({
        ...i,
        microApp: item.appName,
        element: (
          <Layouts>
            <Button onClick={() => window.open(item.appEntry)}>
              子应用： {item.appEntry}
            </Button>
            <MicroApp
              key={item.appName + '/' + item.appName}
              name={item.appName}
              base={'/' + item.appName}
              autoSetLoading
            />
          </Layouts>
        ),
      });
    });
  });
  extraRoutes = routes;
  oldRender();
}
