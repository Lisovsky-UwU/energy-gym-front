import Vue from 'vue'
import Vuex from 'vuex'
import groups from '@/store/modules/groups'
import authentication from '@/store/modules/authentication'
import entries from '@/store/modules/entries'
import ads from '@/store/modules/ads'
import news from '@/store/modules/news'
import user_data from '@/store/modules/user_data'
import student_visits from '@/store/modules/student_visits'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: { groups, authentication, entries, ads, news, user_data, student_visits }
})
