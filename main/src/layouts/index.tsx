import { PageContainer } from '@ant-design/pro-components';
import { Outlet } from '@umijs/max';

export default () => {
  return <PageContainer fixedHeader>{<Outlet />}</PageContainer>;
};
