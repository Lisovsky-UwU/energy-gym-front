<template>
  <MainBlockLkTemplate title="Настройки профиля">
    <div class="p-4 grid grid-cols-1 lg:grid-cols-2 lg:gap-4 min-h-[500px] gap-3 lg:min-h-0">
      <ui-input label="Фамилия" v-model="localUserData.secondname" readonly/>
      <ui-input label="Имя" v-model="localUserData.firstname" readonly/>
      <ui-input label="Отчество" v-model="localUserData.surname" readonly/>
      <ui-input label="Студенческий билет" v-model="localUserData.studentCard" readonly/>
      <ui-input label="Группа" v-model="localUserData.group" readonly/>
      <div class="flex place-items-center justify-center">
        <input type="file" id="fileInput" hidden @change="loadNewPhoto" accept=".jpg,.png,.bmp">
        <button :disabled="loadingUpdateImage" :class="loadingUpdateImage ? 'btn-custom-load' : 'btn-custom'" class="btn-custom" @click="updatePhoto">
          <LoadingSmall v-if="loadingUpdateImage"/>
          Выбрать фото
        </button>
      </div>
      <!-- <div class="lg:col-span-2 flex place-items-center justify-center">
        <button :disabled="loadingSave" :class="loadingSave ? 'btn-custom-load' : 'btn-custom'" @click="updateUserData()">
          <LoadingSmall v-if="loadingSave"/>
          Сохранить изменения
        </button>
      </div> -->

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

// const loadingSave = ref(false)
const loadingSavePassword = ref(false)
const loadingUpdateImage = ref(false)
const localUserData = reactive({...userData.userData}) as UserData

const passwordChangeData = reactive({
  oldPassword: '',
  newPassword: '',
  newPasswordRepeat: ''
})

// function updateUserData() {
//   loadingSave.value = true
//   userData.update(localUserData, 'STUDENT')
//     .finally(() => {
//       loadingSave.value = false
//     })
// }

function changePassword() {
  if (passwordChangeData.newPassword != passwordChangeData.newPasswordRepeat) {
    snackbar.showError('Новый пароль не совпадает')
    return
  }

  loadingSavePassword.value = true
  userData.changePassword(
    passwordChangeData.oldPassword,
    passwordChangeData.newPassword,
    'STUDENT'
  ).finally(() => {
    loadingSavePassword.value = false
  })
}

function updatePhoto() {
  const inputElement = document.getElementById("fileInput")
  inputElement?.click()
}

function loadNewPhoto(event: any) {
  loadingUpdateImage.value = true
  userData.loadNewPhoto(event, 'STUDENT')
    .finally(() => {
      loadingUpdateImage.value = false
    })
}
</script>