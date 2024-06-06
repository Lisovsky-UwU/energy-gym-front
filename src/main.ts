import './assets/main.css'
import 'v-calendar/style.css';
import '@/assets/calendar.css'

import { setupCalendar } from 'v-calendar';

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(setupCalendar, {})

app.mount('#app')
