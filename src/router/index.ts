import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: async () => await import('@/layers/BaseMainLayer.vue')
    },
    {
      path: '/lk',
      component: async () => await import('@/layers/BaseLkLayer.vue'),
      children: [
        {
          path: '',
          component: async () => await import('@/views/student/Home.vue')
        },
        {
          path: 'create-entry',
          component: async () => await import('@/views/student/CreateEntry.vue')
        },
        {
          path: 'coach-support',
          component: async () => await import('@/views/student/CoachSupport.vue')
        },
        {
          path: 'support',
          component: async () => await import('@/views/student/Support.vue')
        },
        {
          path: 'profile-settings',
          component: async () => await import('@/views/student/ProfileSettings.vue')
        },
        {
          path: ':pathMatch(.*)*',
          component: async () => await import('@/views/NotFound.vue')
        },
      ]
    },
    {
      path: '/coach',
      component: async () => await import('@/layers/BaseCoachLayer.vue'),
      children: [
        {
          path: '',
          component: async () => await import('@/views/coach/Home.vue')
        },
        {
          path: 'lists',
          component: async () => await import('@/views/coach/student_list/SelectDay.vue')
        },
        {
          path: 'lists/:weekday',
          component: async () => await import('@/views/coach/student_list/DayList.vue'),
          props: true
        },
        {
          path: 'reports',
          component: async () => await import('@/views/coach/Reports.vue')
        },
        {
          path: 'student-chats',
          component: async () => await import('@/views/coach/StudentChats.vue')
        },
        {
          path: 'profile-settings',
          component: async () => await import('@/views/coach/ProfileSettings.vue')
        },
        {
          path: ':pathMatch(.*)*',
          component: async () => await import('@/views/NotFound.vue')
        },
      ]
    }
  ]
})

export default router
