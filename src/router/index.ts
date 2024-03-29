import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: import('@/layers/BaseMainLayer.vue')
    },
    {
      path: '/lk',
      component: import('@/layers/BaseLkLayer.vue'),
      children: [
        {
          path: '',
          component: import('@/views/student/Home.vue')
        }
      ]
    }
  ]
})

export default router
