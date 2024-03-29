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
        },
        {
          path: 'create-entry',
          component: import('@/views/student/CreateEntry.vue')
        },
        {
          path: ':pathMatch(.*)*',
          component: import('@/views/NotFound.vue')
        },
      ]
    }
  ]
})

export default router
