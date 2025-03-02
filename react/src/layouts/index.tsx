// import type { ProSettings } from "@ant-design/pro-components"
import useHistoryFromMaster from '@/hooks/useHistoryFromMaster';
import { Outlet, useModel } from '@umijs/max';
import { Button, Col, ConfigProvider, Row } from 'antd';

export default () => {
  const { push, pushMaster } = useHistoryFromMaster();
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
  const isQian = window.__POWERED_BY_QIANKUN__;
  console.log(initialState, 'initialState----');

  return (
    <ConfigProvider
      theme={
        isQian &&
        masterProps.mainInitialState?.initialState?.settings?.colorPrimary
          ? {
              token: {
                colorPrimary:
                  masterProps.mainInitialState?.initialState?.settings
                    ?.colorPrimary,
                colorLink:
                  masterProps.mainInitialState?.initialState?.settings
                    ?.colorPrimary,
              },
            }
          : {}
      }
    >
      <Row>
        <Col span={24}>
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
              <p
                style={{
                  wordBreak: 'break-all',
                }}
              >
                当前登录人信息: 基座initialState：
                {JSON.stringify(masterProps?.mainInitialState?.initialState)}
              </p>
            </div>
          )}

          <p
            style={{
              wordBreak: 'break-all',
            }}
          >
            当前登录人信息: 子应用initialState：
            {JSON.stringify(initialState)}
          </p>

          {<Outlet />}
        </Col>
      </Row>
    </ConfigProvider>
  );
};
