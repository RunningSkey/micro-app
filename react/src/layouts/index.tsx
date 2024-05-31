// import type { ProSettings } from "@ant-design/pro-components"
import useHistoryFromMaster from '@/hooks/useHistoryFromMaster';
import { Outlet, useModel } from '@umijs/max';
import { Button } from 'antd';

export default () => {
  const { push, pushMaster, pushSlave } = useHistoryFromMaster();
  const { setInitialState, initialState } = useModel('@@initialState');
  const masterProps = useModel('@@qiankunStateFromMaster');
  const refresh = () => {
    if (masterProps && masterProps.mainInitialState?.initialState) {
      console.log(masterProps, '--', initialState);
      setInitialState(masterProps.mainInitialState?.initialState);
    }
  };
  console.log(masterProps, 'masterProps');

  const appPath = window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__;

  return (
    <div>
      {window.__POWERED_BY_QIANKUN__ && (
        <div>
          <h3>
            主应用引入了。。。
            <Button onClick={refresh}>更新子应用initialState</Button>
            <a href={appPath} rel="noreferrer" target="_blank">
              打开独立应用：{appPath}
            </a>
          </h3>
          <Button
            onClick={() => {
              push('/table');
            }}
          >
            子应用push跳转子应用table
          </Button>
          <Button
            onClick={() => {
              push('/home');
            }}
          >
            子应用push跳转子应用home
          </Button>
          <Button
            onClick={() => {
              pushMaster('/home');
            }}
          >
            子应用pushMaster跳转父应用home
          </Button>
          <p>
            当前登录人信息: 基座initialState：
            {JSON.stringify(masterProps?.mainInitialState?.initialState)}
          </p>
        </div>
      )}

      <p>
        当前登录人信息: 子应用initialState：
        {JSON.stringify(initialState)}
      </p>

      {<Outlet />}
    </div>
  );
};
