import { createRouter, createWebHistory } from 'vue-router'
import Auth from '../views/auth.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'default',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/default.vue'),
    },
    {
      path: '/auth',
      name: 'auth',
      component: Auth,
    },
  ],
})

export default router
