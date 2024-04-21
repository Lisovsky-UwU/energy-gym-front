<template>
  <MainBlockLkTemplate title="Настройки профиля">
    <div class="p-4 grid grid-cols-1 lg:grid-cols-2 lg:gap-4 min-h-[500px] gap-3 lg:min-h-0">
      <ui-input label="Фамилия" v-model="localUserData.secondname"/>
      <ui-input label="Имя" v-model="localUserData.firstname"/>
      <ui-input label="Отчество" v-model="localUserData.surname"/>
      <ui-input label="Логин" v-model="localUserData.studentCard" readonly/>
      <div class="flex place-items-center justify-center lg:col-span-2">
        <button class="btn-custom">
          Выбрать фото
        </button>
      </div>
      <div class="lg:col-span-2 flex place-items-center justify-center">
        <button :disabled="loadingSave" :class="loadingSave ? 'btn-custom-load' : 'btn-custom'" @click="updateUserData()">
          <LoadingSmall v-if="loadingSave"/>
          Сохранить изменения
        </button>
      </div>

      <hr class="lg:col-span-2 mt-4" noshade style="height: 2px;">
      <span class="lg:col-span-2 text-center text-xl">
        Смена пароля
      </span>

      <form class="lg:col-span-2 grid grid-cols-1 lg:grid-cols-2 lg:gap-4 gap-3" @submit.prevent="changePassword()">
        <ui-input type="password" placeholder="*******" required minlength="8" label="Новый пароль" v-model="passwordChangeData.newPassword"/>
        <ui-input type="password" placeholder="*******" required minlength="8" label="Повторите новый пароль" v-model="passwordChangeData.newPasswordRepeat"/>
        <ui-input type="password" placeholder="*******" required minlength="8" label="Прежний пароль" v-model="passwordChangeData.oldPassword"/>
        <div class="flex place-items-center justify-center">
          <button :disabled="loadingSavePassword" :class="loadingSavePassword ? 'btn-custom-load' : 'btn-custom'" type="submit">
            <LoadingSmall v-if="loadingSavePassword"/>
            Сменить пароль
          </button>
        </div>
      </form>
      
    </div>
  </MainBlockLkTemplate>
</template>

<script lang="ts" setup>
import MainBlockLkTemplate from '@/components/ui/MainBlockLkTemplate.vue'
import UiInput from '@/components/ui/Input.vue'
import LoadingSmall from '@/components/ui/LoadingSmall.vue'
import { reactive, ref } from 'vue';
import { useUserDataStore, type UserData } from '@/stores/user';
import { useSnackbarStore } from '@/stores/snackbar';

const userData = useUserDataStore()
const snackbar = useSnackbarStore()

const loadingSave = ref(false)
const loadingSavePassword = ref(false)
const localUserData = reactive({...userData.userData}) as UserData

const passwordChangeData = reactive({
  oldPassword: '',
  newPassword: '',
  newPasswordRepeat: ''
})

function updateUserData() {
  loadingSave.value = true
  userData.update(localUserData, 'COACH')
    .finally(() => {
      loadingSave.value = false
    })
}

function changePassword() {
  if (passwordChangeData.newPassword != passwordChangeData.newPasswordRepeat) {
    snackbar.showError('Новый пароль не совпадает')
    return
  }

  loadingSavePassword.value = true
  userData.changePassword(
    passwordChangeData.oldPassword,
    passwordChangeData.newPassword,
    'COACH'
  ).finally(() => {
    loadingSavePassword.value = false
  })
}
</script>