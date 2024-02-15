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
              <h2 class="text-2xl font-semibold mb-2 text-blue-600">Section 2 Content</h2>
              <p class="text-gray-700">Proin non velit ac purus malesuada venenatis sit amet eget lacus. Morbi quis purus id ipsum ultrices aliquet Morbi quis.</p>
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