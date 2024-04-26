import Vue from "vue";
import "./public-path";
import "normalize.css/normalize.css"; // A modern alternative to CSS resets

import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import locale from "element-ui/lib/locale/lang/en"; // lang i18n

import "@/styles/index.scss"; // global css

import App from "./App";
import store from "./store";
import router from "./router";

import "@/icons"; // icon
import "@/permission"; // permission control

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
if (process.env.NODE_ENV === "production") {
  const { mockXHR } = require("../mock");
  mockXHR();
}

// set ElementUI lang to EN
Vue.use(ElementUI, { locale });
// 如果想要中文版 element-ui，按如下方式声明
// Vue.use(ElementUI)

Vue.config.productionTip = false;

let instance = null;

export const render = (props) => {
  console.log(props, "pppr", router);
  instance = new Vue({
    el: "#app",
    router,
    store,
    render: (h) => h(App),
  });
};

if (!window.__POWERED_BY_QIANKUN__) {
  render();
}
// 生命周期的钩子函数
// 导出第一次进入当前子应用的钩子函数
export async function bootstrap(props) {
  console.log(props, "bootstrap-------------");
}

// 导出每次创建挂载时的钩子函数
export async function mount(props) {
  console.log(props, "mount-------------");
  props.setLoading(false);
  render(props); // 核心在这里，每次挂载的时候，执行我们所封装的render函数
}

// 导出每次销毁时的钩子函数
export async function unmount() {
  console.log(instance, "instance");
  instance.$destroy?.();
  // instance._container.innerHTML = ''
  instance = null;
}
