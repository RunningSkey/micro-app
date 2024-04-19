// 运行时配置

import { RuntimeConfig, history } from '@umijs/max';
import { Button } from 'antd';

// 全局初始化数据配置，用于 Layout 用户信息和权限初始化
// 更多信息见文档：https://umijs.org/docs/api/runtime-config#getinitialstate
export async function getInitialState(): Promise<{ name: string }> {
  return { name: '@umijs/max' };
}

export const layout: RuntimeConfig['layout'] = () => {
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
      menuData.forEach((item) => {
        if (item.name === 'app1') {
          item.children?.push(
            ...[
              {
                name: 'app1_home',
                path: '/app1/home',
              },
              {
                name: 'app1_access',
                path: '/app1/access',
              },
              {
                name: 'app1_table',
                path: '/app1/table',
              },
            ],
          );
        }
      });
      return menuData;
    },
    rightContentRender(_, dom) {
      return (
        <>
          <Button>333</Button>
          {dom}
        </>
      );
    },
    logout() {
      history.push('/login');
    },
    links: [<a key={1}>hahah</a>],
  };
};
