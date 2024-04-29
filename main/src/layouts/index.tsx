import { PageContainer } from '@ant-design/pro-components';
import { Outlet } from '@umijs/max';

export default ({ children }: { children: React.ReactNode }) => {
  return (
    <PageContainer fixedHeader>
      {<Outlet />}
      {children}
    </PageContainer>
  );
};
