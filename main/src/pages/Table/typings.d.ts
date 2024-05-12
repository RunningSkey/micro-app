import { APP_TYPE } from '@/constants';

declare namespace TABLE_API {
  interface Route {
    name: string;
    path: string;
    children?: Route[];
  }
  interface SubApp {
    appName: string;
    appEntry: string;
    /** 静态app 无法删除和配置路由 */
    appType: keyof typeof APP_TYPE;
    appRoutes?: Route[];
  }
}
