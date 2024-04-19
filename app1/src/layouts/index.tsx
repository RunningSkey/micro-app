// import type { ProSettings } from "@ant-design/pro-components"
import { Outlet } from '@umijs/max';

export default () => {
  // const settinngs: ProSettings | undefined = {
  //   fixSiderbar: true,
  //   layout: 'mix',
  //   splitMenus: true
  // }

  return (
    <div>
      {window.__POWERED_BY_QIANKUN__ && <h3>被嵌套了。。。</h3>}
      {<Outlet />}
    </div>
  );
};
