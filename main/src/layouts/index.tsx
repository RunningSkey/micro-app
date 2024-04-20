import { PageContainer } from '@ant-design/pro-components';
// import type { ProSettings } from "@ant-design/pro-components"
import { Outlet } from '@umijs/max';

export default ({ children }: { children: React.ReactNode }) => {
  // const settinngs: ProSettings | undefined = {
  //   fixSiderbar: true,
  //   layout: 'mix',
  //   splitMenus: true
  // }
  // if(['/login','/home','/table','/access'].includes(location.pathname)){
  //   console.log(location.pathname);

  // return <Outlet />;
  // }

  return (
    <PageContainer
      header={{
        style: {
          zIndex: 1,
        },
      }}
      fixedHeader
    >
      {<Outlet />}
      {children}
    </PageContainer>
  );
};
