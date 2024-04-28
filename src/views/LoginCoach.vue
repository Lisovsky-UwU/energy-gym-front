<template>
  <div class="h-screen bg-slate-600 background-custom">
    <div class="bg-white sm:float-right h-screen p-6 w-full sm:w-[400px]">
      <div class="grid gap-4 grid-cols-1 content-center sm:h-full">
        <router-link to="/" class="justify-self-center">
          <img class="h-56" src="@/assets/logo_without_back.png">
        </router-link>
        <form class="gap-4 grid grid-cols-1" @submit.prevent="login()">
          <div class="">
            <ui-input label="Логин" placeholder="12345678" v-model="loginData.login" required/>
          </div>
          <div>
            <ui-input type="password" label="Пароль" placeholder="*******" v-model="loginData.password" required/>
          </div>
          <button :disabled="loading" :class="loading ? 'btn-custom-load' : 'btn-custom'" type="submit">
            <LoadingSmall v-if="loading"/>
            Войти
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import UiInput from '@/components/ui/Input.vue'
import LoadingSmall from '@/components/ui/LoadingSmall.vue';
import { ref, reactive } from 'vue'
import { useApiCoachStore } from '@/stores/api';

const api = useApiCoachStore()

const loading = ref(false)
const loginData = reactive({
  login: '',
  password: ''
})

function login() {
  loading.value = true
  api.login(loginData.login, loginData.password)
    .finally(() => {
      loading.value = false
    })
}
</script>

<style scoped>
.background-custom {
  background-image: url('@/assets/login_back.jpg');
  background-clip: border-box;
  background-size: cover;
  position: relative;
  background-position-y: 65%;
}
</style>