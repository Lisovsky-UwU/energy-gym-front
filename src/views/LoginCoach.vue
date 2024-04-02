<template>
  <div class="h-screen bg-slate-600 background-custom">
    <div class="bg-white sm:float-right h-screen p-6 w-full sm:w-[400px]">
      <div class="grid gap-4 grid-cols-1 content-center sm:h-full">
        <div class="justify-self-center">
          <img class="h-56" src="@/assets/logo_without_back.png">
        </div>
        <form class="gap-4 grid grid-cols-1" @submit.prevent="login()">
          <div class="">
            <ui-input label="Логин" placeholder="12345678" required/>
          </div>
          <div>
            <ui-input type="password" label="Пароль" placeholder="*******" required/>
          </div>
          <button class="btn-custom" type="submit">
            Войти
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import UiInput from '@/components/ui/Input.vue'

function login() {
  localStorage.setItem('token_coach', 'coach')
  location.reload()
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