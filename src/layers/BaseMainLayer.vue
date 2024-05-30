<template>
  <div class="flex flex-col bg-second min-h-screen">
    <div class="py-5 bg-second flex flex-row place-items-center px-5 gap-2">
      <img src="@/assets/logo_without_back.png" alt="logo" class="h-16">
      <span class="text-white text-[42px] ml-4 font-bold">Энергия</span>

      <div class="grow h-2"/>

      <router-link to="/lk" class="hidden sm:block text-white text-xl border font-normal rounded-lg py-2 px-6 hover:bg-opacity-15 hover:bg-white transition-all border-gray-500">
        Личный кабинет
      </router-link>

      <router-link to="/lk" class="sm:hidden block mt-2 ml-2 text-white text-xl border font-normal rounded-lg py-2 px-3 hover:bg-opacity-15 hover:bg-white transition-all border-gray-500">
        <svg-icon type="mdi" :path="mdiAccount"></svg-icon>
      </router-link>
    </div>
    <div class="parallax-element h-[450px] bg-center w-full bg-fixed"></div>

    <div class="text-white p-9 text-xl font-normal">
      Дорогие студенты, приглашаем вас в спортивный зал “Энергия”, в который вы можете записаться, перейдя в <router-link to="/lk" class="link-custom">личный кабинет</router-link>.
      <br>
      Если у вас имеются вопросы или пожелания, пишите на почту <a class="link-custom" href="mailto:energycats@gmail.com">energycats@gmail.com</a>.
    </div>
    
    <div class="bg-gray-600 w-full h-4"></div>

    <div class="p-9">
      <span class="text-white text-xl">Новости спортивного зала</span>

      <div v-if="loadNews" class="new-block-back mt-3">
        <div class="new-block-forward text-lg flex flex-col gap-3">
          <div class="h-3 w-64 bg-slate-700 rounded animate-pulse"></div>
          <div class="h-3 bg-slate-700 rounded animate-pulse"></div>
          <div class="h-3 w-80 bg-slate-700 rounded animate-pulse"></div>
        </div>
      </div>

      <div v-for="newData in news" class="new-block-back mt-3">
        <div class="new-block-forward text-lg">
          От: {{ newData.createTime }}
          <br>
          {{ newData.body }}
        </div>
      </div>

      <div v-if="news.length == 0 && !loadNews" class="new-block-back mt-3">
        <div class="new-block-forward text-lg">
          <span>Новостей нет</span>
        </div>
      </div>
    </div>

    <div class="grow"></div>

    <div class="relative bg-gray-600 text-white flex flex-col p-6 place-items-center gap-6">
      <div class="flex gap-4 sm:gap-48 flex-col sm:flex-row">
        <div>
          Адрес: 630108 г. Новосибирск ул. Плахотного 8/1 <br>
          Тренер: Дьяченко Наталья Николавена <br>
          Номер телефона: 8 (913) 9143990 <br>
        </div>
        <div>
          Ссылки: <br>
          СГУГиТ: <a href="https://sgugit.ru/" class="underline">https://sgugit.ru/</a> <br>
          Скачать на андроид: <a href="#" class="underline">download</a> <br>
        </div>
        
      </div>
      <span class="mb-16 sm:mb-0 text-center">© Сибирский государственный университет геосистем и технологий. 1994-2024 г.</span>
      <div class="absolute flex flex-row bottom-4 right-4">
        <img src="@/assets/clew.png" class="h-16" alt="clew">
        <img src="@/assets/cat.svg" class="h-16" alt="cat">
      </div>
    </div>

  </div>
</template>


<script lang="ts" setup>
import SvgIcon from '@jamescoyle/vue-icon'
import { mdiAccount } from '@mdi/js';
import { onMounted, ref } from 'vue';

const loadNews = ref(true)
let news = ref([] as any)

onMounted(() => {
  fetch('/api/v1/new/get', { method: 'GET' })
  .then(async (resp) => {
      news.value = (await resp.json())['data']
    })
  .finally(() => {
    loadNews.value = false
  })
})
</script>

<style scoped>
.parallax-element {
  background-image: url('@/assets/login_back.jpg');
  background-position-y: -100px;
  background-size: cover;
}


@media (min-width: 768px) {
  .parallax-element {
    background-position-y: -10em;
  }
}

@media (min-width: 1280px) {
  .parallax-element {
    background-position-y: 100%;
  }
}
</style>