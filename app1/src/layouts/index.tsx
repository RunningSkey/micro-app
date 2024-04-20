// import type { ProSettings } from "@ant-design/pro-components"
import { Outlet, useModel } from '@umijs/max';

export default () => {
  // const settinngs: ProSettings | undefined = {
  //   fixSiderbar: true,
  //   layout: 'mix',
  //   splitMenus: true
  // }
  const masterProps = useModel('@@qiankunStateFromMaster');

  return (
    <div>
      {window.__POWERED_BY_QIANKUN__ && <h3>主应用引入了。。。</h3>}
      当前登录人信息:{' '}
      {JSON.stringify(masterProps?.mainInitialState?.initialState)}
      {<Outlet />}
    </div>
  );
};
