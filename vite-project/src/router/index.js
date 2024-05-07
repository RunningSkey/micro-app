import { createRouter, createWebHistory, createMemoryHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
console.log(import.meta.env.VITE_BASE_URL, 'import.meta.env.VITE_BASE_URL')
export const createRouters = ({ memoryHistory }) =>
  createRouter({
    history: memoryHistory
      ? createMemoryHistory(import.meta.env.VITE_BASE_URL)
      : createWebHistory(import.meta.env.VITE_BASE_URL),
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
      }
    ]
  })

// export default router
