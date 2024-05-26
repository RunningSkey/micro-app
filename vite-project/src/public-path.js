import { qiankunWindow } from 'vite-plugin-qiankun/dist/helper'

if (qiankunWindow.__POWERED_BY_QIANKUN__) {
  qiankunWindow.__webpack_public_path__ = qiankunWindow.__INJECTED_PUBLIC_PATH_BY_QIANKUN__
  console.log(qiankunWindow.__webpack_public_path__, 'qiankunWindow.__webpack_public_path__')
}
