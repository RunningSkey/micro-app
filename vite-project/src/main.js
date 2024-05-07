// import './assets/main.css'
import './public-path'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { qiankunWindow, renderWithQiankun } from 'vite-plugin-qiankun/dist/helper'
import App from './App.vue'
import { createRouters } from './router'

let instance

const render = (props) => {
  instance = createApp(App)
  instance.config.globalProperties.$masterProps = props
  instance
    .use(createPinia())
    .use(
      createRouters({
        memoryHistory: props.memoryHistory
      })
    )
    .mount(props.container?.querySelector('#app') || '#app')
}
if (!qiankunWindow.__POWERED_BY_QIANKUN__) {
  render({})
} else {
  renderWithQiankun({ bootstrap, mount, unmount })
}
// 生命周期的钩子函数
// 导出第一次进入当前子应用的钩子函数
export async function bootstrap(props) {
  console.log(props, 'bootstrap-------------')
}

// 导出每次创建挂载时的钩子函数
export async function mount(props) {
  console.log(props, 'mount-------------')
  props.setLoading(false)
  render(props) // 核心在这里，每次挂载的时候，执行我们所封装的render函数
}

// 导出每次销毁时的钩子函数
export async function unmount() {
  console.log(instance, 'instance')
  instance.unmount?.()
  instance = null
}
