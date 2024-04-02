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
          path: 'coach-support',
          component: import('@/views/student/CoachSupport.vue')
        },
        {
          path: 'support',
          component: import('@/views/student/Support.vue')
        },
        {
          path: 'profile-settings',
          component: import('@/views/student/ProfileSettings.vue')
        },
        {
          path: ':pathMatch(.*)*',
          component: import('@/views/NotFound.vue')
        },
      ]
    },
    {
      path: '/coach',
      component: import('@/layers/BaseCoachLayer.vue'),
      children: [
        {
          path: '',
          component: import('@/views/coach/Home.vue')
        },
        {
          path: 'support',
          component: import('@/views/coach/Support.vue')
        },
        {
          path: 'student-chats',
          component: import('@/views/coach/StudentChats.vue')
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
