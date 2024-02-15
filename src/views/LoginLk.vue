<template>
  <div class="h-screen bg-slate-600 background-custom">
    <div class="w-96 bg-white float-right h-screen p-6">
      <div class="grid gap-4 grid-cols-1 content-center h-full">
        <div class="justify-self-center">
          <img class="h-56" src="@/assets/logo_without_back.png">
        </div>
          <div class="">

            <div class="mb-4 flex space-x-4 p-2 bg-white rounded-lg shadow-md">
              <button @click="openTab = 1" :class="{ 'bg-blue-600 text-white': openTab === 1 }" class="flex-1 py-2 px-4 rounded-md focus:outline-none focus:shadow-outline-blue transition-all duration-300">Вход</button>
              <button @click="openTab = 2" :class="{ 'bg-blue-600 text-white': openTab === 2 }" class="flex-1 py-2 px-4 rounded-md focus:outline-none focus:shadow-outline-blue transition-all duration-300">Регистрация</button>
            </div>
            <div class="transition-all">

            </div>
            <div v-if="openTab === 1" class="transition-all duration-300 bg-white p-4 rounded-lg shadow-md">
              <form class="gap-4 grid grid-cols-1" @submit.prevent="">
                <div class="">
                  <ui-input label="Студенческий билет" placeholder="12345678"/>
                </div>
                <div>
                  <ui-input type="password" label="Пароль" placeholder="*******"/>
                </div>
                <ui-button label="Войти" submit/>
              </form>
              
            </div>

            <div v-if="openTab === 2" class="transition-all duration-300 bg-white p-4 rounded-lg shadow-md">

              <div>
                <div v-if="registrationStep == 1">
                  <div class="h-auto grid grid-cols-1">
                    <ui-input label="Студенческий билет" placeholder="12345678"/>
                  </div>
                </div>

                <div v-if="registrationStep == 2">
                  <div class="h-auto gap-2 grid grid-cols-1">
                    <div>
                      <ui-input label="Придумайте пароль" placeholder="********"/>
                    </div>
                    <div>
                      <ui-input label="Подтвердите пароль" placeholder="********"/>
                    </div>
                  </div>
                </div>

                <div v-if="registrationStep == 3">
                  <div class="h-auto gap-2 grid grid-cols-1">
                    <div>
                      <ui-input label="Фамилия" placeholder="Иванов"/>
                    </div>
                    <div>
                      <ui-input label="Имя" placeholder="Иван"/>
                    </div>
                    <div>
                      <ui-input label="Отчество" placeholder="Иванович"/>
                    </div>
                    <div>
                      <ui-input label="Группа" placeholder="БИ-12"/>
                    </div>
                  </div>
                </div>

                <div class="mt-5 flex justify-between items-center gap-x-2">
                  <button type="button" :disabled="registrationStep < 2" class="py-2 px-3 inline-flex items-center gap-x-1 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none" @click="registrationStep -= 1">
                    <svg class="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>
                    Назад
                  </button>
                  <button v-if="registrationStep < 3" type="button" class="py-2 px-3 inline-flex items-center gap-x-1 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none" @click="registrationStep += 1">
                    Далее
                    <svg class="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
                  </button>
                  <button v-else type="button" class="py-2 px-3 inline-flex items-center gap-x-1 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none" @click="registrate()">
                    Зарегистрироваться
                  </button>
                </div>
              </div>

            </div>

          </div>
        </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import UiInput from '@/components/ui/Input.vue'
import UiButton from '@/components/ui/Button.vue'

const openTab = ref(1)
const registrationStep = ref(1)

function registrate() {
  localStorage.setItem('token', 'user')
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