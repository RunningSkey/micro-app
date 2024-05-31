<template>
  <div id="app">
    <a
      v-show="!!appPath"
      :href="appPath"
      target="_blank"
      :style="{
        color: 'red',
      }"
      >打开独立应用：{{ appPath }}</a
    >
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      appPath: window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__,
    };
  },
};
</script>
