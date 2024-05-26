import { createRouter, createWebHistory, createMemoryHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { qiankunWindow } from 'vite-plugin-qiankun/dist/helper'

console.log(import.meta.env, 'import.meta.env')
export const createRouters = ({ memoryHistory }) => {
  const base = (qiankunWindow.__POWERED_BY_QIANKUN__ ? '/child' : '') + import.meta.env.BASE_URL
  console.log(base, 'base-------')
  return createRouter({
    history: memoryHistory ? createMemoryHistory(base) : createWebHistory(base),
    routes: [
      {
        path: '/',
        redirect: '/home'
      },
      {
        path: '/home',
        name: 'home',
        component: HomeView
      },
      {
        path: '/about',
        name: 'about',
        // route level code-splitting
        // this generates a separate chunk (About.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import('../views/AboutView.vue')
      },
      {
        path: '/menu',
        name: 'menu',
        // route level code-splitting
        // this generates a separate chunk (About.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        // component: () => import('../views/AboutView.vue'),
        redirect: '/menu/menu-item-1',
        children: [
          {
            path: '/menu/menu-item-1',
            name: 'menu-1',
            component: () => import('../views/Menu.vue')
          },
          {
            path: '/menu/menu-item-2',
            name: 'menu-2',
            component: () => import('../views/Menu.vue')
          }
        ]
      }
    ]
  })
}

// export default router
