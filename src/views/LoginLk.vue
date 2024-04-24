<template>
  <div class="h-screen bg-slate-600 background-custom">
    <div class="bg-white sm:float-right h-screen p-6 w-full sm:w-[400px]">
      <div class="grid gap-4 grid-cols-1 content-center sm:h-full">
        <router-link to="/" class="justify-self-center">
          <img class="h-56" src="@/assets/logo_without_back.png">
        </router-link>
          <div class="">

            <div class="mb-4 flex space-x-4 p-2 bg-white rounded-lg shadow-md">
              <button :disabled="loadingLogin" @click="openTab = 1" :class="{ 'bg-primary text-white': openTab === 1 }" class="flex-1 py-2 px-4 rounded-md focus:outline-none focus:shadow-outline-blue transition-all duration-300">Вход</button>
              <button :disabled="loadingLogin" @click="openTab = 2" :class="{ 'bg-primary text-white': openTab === 2 }" class="flex-1 py-2 px-4 rounded-md focus:outline-none focus:shadow-outline-blue transition-all duration-300">Регистрация</button>
            </div>
            <div class="transition-all">

            </div>
            <div v-if="openTab === 1" class="transition-all duration-300 bg-white p-4 rounded-lg shadow-md">
              <form class="gap-4 grid grid-cols-1" @submit.prevent="login">
                <div class="">
                  <ui-input label="Студенческий билет" type="number" placeholder="12345678" v-model="loginText" required/>
                </div>
                <div>
                  <ui-input type="password" label="Пароль" placeholder="*******" v-model="passwordText" required/>
                </div>
                <button :disabled="loadingLogin" :class="loadingLogin ? 'btn-custom-load' : 'btn-custom'" type="submit">
                  <LoadingSmall v-if="loadingLogin"/>
                  Войти
                </button>
              </form>
              
              <router-link :to="loadingLogin ? '/lk' : '/coach'" :class="'bg-blue-500 text-white px-4 py-2 rounded-md transition-all text-center block mt-3 ' + (loadingLogin ? '' : 'hover:bg-blue-400')">
                Для тренера
              </router-link>
            </div>

            <div v-if="openTab === 2" class="transition-all duration-300 bg-white p-4 rounded-lg shadow-md">

              <form @submit.prevent="registrateNext()">
                <div v-if="registrationStep == 1">
                  <div class="h-auto grid grid-cols-1">
                    <ui-input label="Студенческий билет" type="number" placeholder="12345678" v-model="registrationData.studentCard"/>
                  </div>
                </div>

                <div v-if="registrationStep == 2">
                  <div class="h-auto gap-2 grid grid-cols-1">
                    <div>
                      <ui-input type="password" label="Придумайте пароль" placeholder="********" v-model="registrationData.password"/>
                    </div>
                    <div>
                      <ui-input type="password" label="Подтвердите пароль" placeholder="********" v-model="registrationData.passwordRepeat"/>
                    </div>
                  </div>
                </div>

                <div v-if="registrationStep == 3">
                  <div class="h-auto gap-2 grid grid-cols-1">
                    <div>
                      <ui-input label="Фамилия" placeholder="Иванов" v-model="registrationData.secondname"/>
                    </div>
                    <div>
                      <ui-input label="Имя" placeholder="Иван" v-model="registrationData.firstname"/>
                    </div>
                    <div>
                      <ui-input label="Отчество" placeholder="Иванович" v-model="registrationData.surname"/>
                    </div>
                    <div>
                      <ui-input label="Группа" placeholder="БИ-12" v-model="registrationData.group"/>
                    </div>
                  </div>
                </div>

                <div class="mt-5 flex justify-between items-center gap-x-2">
                  <button type="button" :disabled="registrationStep < 2" class="py-2 px-3 inline-flex items-center gap-x-1 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none transition-all" @click="registrationStep -= 1">
                    <svg class="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>
                    Назад
                  </button>
                  <button :disabled="loadingLogin" v-if="registrationStep < 3" type="submit" class="btn-registrate-next">
                    <LoadingSmall v-if="loadingLogin"/>
                    Далее
                    <svg class="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
                  </button>
                  <button :disabled="loadingLogin" v-else type="submit" class="btn-registrate-next">
                    <LoadingSmall v-if="loadingLogin"/>
                    Зарегистрироваться
                  </button>
                </div>
              </form>

            </div>

          </div>
        </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import UiInput from '@/components/ui/Input.vue'
import LoadingSmall from '@/components/ui/LoadingSmall.vue';
import { ref, reactive } from 'vue'
import { useApiStudentStore } from '@/stores/api';
import { useSnackbarStore } from '@/stores/snackbar';

const api = useApiStudentStore()
const snackbar = useSnackbarStore()

const loadingLogin = ref(false)
const openTab = ref(1)
const registrationStep = ref(1)
const registrationData = reactive({
  studentCard: null as number | null,
  password: '',
  passwordRepeat: '',
  firstname: '',
  secondname: '',
  surname: '',
  group: ''
})

const loginText = ref('')
const passwordText = ref('')

function login() {
  loadingLogin.value = true
  api.login(loginText.value, passwordText.value)
    .finally(() => {
      loadingLogin.value = false
    })
}

async function registrateNext() {
  if (loadingLogin.value) {
    return
  }

  if (!registrationData.studentCard) {
    snackbar.showError('Введите номер студенческого')
    return
  } 

  if (registrationStep.value == 1) {
    loadingLogin.value = true
    try {
      if (await api.checkStudentCard(registrationData.studentCard)) {
        snackbar.showError('Номер студенческого билета уже зарегестрирован')
      } else {
        registrationStep.value += 1
      }
    }finally {
      loadingLogin.value = false
    }
  } 
  
  else if (registrationStep.value == 2) {
    if (registrationData.password.length < 8) {
      snackbar.showError('Длина пароля должна быть не меньше 8 символов')
    } else if (registrationData.password != registrationData.passwordRepeat) {
      snackbar.showError('Пароли не совпадают')
    } else {
      registrationStep.value += 1
    }
  } 
  
  else if (registrationStep.value == 3) {
    if (!registrationData.firstname || !registrationData.secondname || !registrationData.group) {
      snackbar.showError('Заполните все поля: Фамилия, Имя и Группа')
      return
    } else {
      loadingLogin.value = true
      try {
        await api.registrate({
          studentCard: registrationData.studentCard,
          password: registrationData.password,
          firstname: registrationData.firstname,
          secondname: registrationData.secondname,
          surname: registrationData.surname,
          group: registrationData.group,
        })
      } finally {
        loadingLogin.value = false
      }
    }
  }
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

.btn-registrate-next {
  @apply py-2 px-3 inline-flex items-center gap-x-1 text-sm font-semibold rounded-lg border border-transparent bg-primary text-white hover:bg-accent disabled:opacity-50 disabled:pointer-events-none transition-all
}
</style>