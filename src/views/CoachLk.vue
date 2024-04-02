<template>
  <div class="h-screen overflow-auto bg-slate-600 background-custom flex flex-col sm:flex-row p-5 lg:p-14 gap-5 sm:gap-14">
    <router-link to="/" class="bg-background rounded-md w-fit mx-auto sm:hidden flex items-center gap-5 px-5 py-2">
      <img src="@/assets/logo_without_back.png" class="h-12">
      <p class="text-[32px] font-light select-none">Энергия СГУГиТ</p>
    </router-link>

    <div class="relative bg-background min-w-80 sm:max-w-80 rounded-md flex items-center pt-8 flex-col overflow-auto min-h-[600px] sm:min-h-0">
      <router-link to="/coach/profile-settings" class="absolute right-5 rounded-3xl bg-second text-white p-2 shadow-md">
        <svg-icon type="mdi" :path="mdiPencil"></svg-icon>
      </router-link>
      <img src="@/assets/default_avatar.svg" alt="default_avatar" class="h-44">
      <div class="mt-4 text-center">
        <p class="text-lg">Дьяченко Наталья Николаевна</p>
        <p class="text-lg">Статус: Тренер</p>
      </div>
      <div class="my-4 w-full px-5 gap-3 flex flex-col">
        <router-link to="/coach" class="menu-btn bg-menu-btn-1 hover:bg-menu-btn-1-hover">
          <svg-icon type="mdi" :path="mdiNewspaper"></svg-icon>
          Главная
        </router-link>

        <router-link to="/coach/lists" class="menu-btn bg-menu-btn-2 hover:bg-menu-btn-2-hover">
          <svg-icon type="mdi" :path="mdiFileDocumentEdit"></svg-icon>
          Списки
        </router-link>

        <router-link to="/coach/student-chats" class="menu-btn bg-menu-btn-3 hover:bg-menu-btn-3-hover">
          <svg-icon type="mdi" :path="mdiPhoneInTalk"></svg-icon>
          Связь со студентами
        </router-link>

        <router-link to="/coach/support" class="menu-btn bg-menu-btn-4 hover:bg-menu-btn-4-hover">
          <svg-icon type="mdi" :path="mdiHeadset"></svg-icon>
          Поддержка
        </router-link>

        <button class="menu-btn bg-menu-btn-5 hover:bg-menu-btn-5-hover" @click="logout()">
          <svg-icon type="mdi" :path="mdiArrowLeftThick"></svg-icon>
          Выход
        </button>
      </div>
    </div>
    <div class="flex-auto flex flex-col gap-10">
      <router-link to="/" class="bg-background rounded-md w-fit mx-auto hidden sm:flex items-center gap-5 px-5 py-2">
        <img src="@/assets/logo_without_back.png" class="h-12">
        <p class="text-[32px] font-light select-none">Энергия СГУГиТ</p>
      </router-link>

      <div class="flex-auto overflow-visible sm:overflow-auto sm:main-block">
        <RouterView/>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import SvgIcon from '@jamescoyle/vue-icon'
import { RouterView } from 'vue-router'
import { mdiPencil, mdiNewspaper, mdiFileDocumentEdit, mdiPhoneInTalk, mdiHeadset, mdiArrowLeftThick } from '@mdi/js';

function logout() {
  localStorage.removeItem('token_coach')
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

.menu-btn {
  @apply py-2 flex uppercase px-3 place-content-center w-full gap-x-2 text-base font-medium rounded-md text-white shadow-md transition-all
}

.main-block {
  max-height: calc(100% - 104px);
}
</style>