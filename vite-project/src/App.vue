<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { getCurrentInstance } from 'vue'
import HelloWorld from './components/HelloWorld.vue'
import { qiankunWindow } from 'vite-plugin-qiankun/dist/helper'
console.log(import.meta.env, '')
const logo = new URL('@/assets/logo.svg', import.meta.url)
const masterProps = getCurrentInstance().appContext.config.globalProperties.$masterProps || {}
const appPath = qiankunWindow.__INJECTED_PUBLIC_PATH_BY_QIANKUN__
</script>

<template>
  <header>
    <img alt="Vue logo" class="logo" :src="logo" width="125" height="125" />
    {{ masterProps?.mainInitialState?.initialState }}
    <div class="wrapper">
      <HelloWorld msg="You did it!" />

      <nav>
        <a
          v-show="!!appPath"
          :href="appPath"
          target="_blank"
          :style="{
            color: 'red'
          }"
          >打开独立应用：{{ appPath }}</a
        >
        <RouterLink :to="'/home'">Home</RouterLink>
        <RouterLink :to="'/about'">About</RouterLink>
        <RouterLink :to="'/menu/menu-item-1'">menu1</RouterLink>
        <RouterLink :to="'/menu/menu-item-2'">menu2</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style scoped>
header {
  line-height: 1.5;
  /* max-height: 100vh; */
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
