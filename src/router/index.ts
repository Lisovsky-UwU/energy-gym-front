import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/lk',
      component: import('@/layers/BaseLkLayer.vue')
    }
  ]
})

export default router
