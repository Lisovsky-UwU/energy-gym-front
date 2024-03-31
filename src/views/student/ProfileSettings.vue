<template>
  <MainBlockLkTemplate title="Настройки профиля">
    <div class="p-4 grid grid-cols-1 lg:grid-cols-2 lg:gap-4 min-h-[500px] gap-3 lg:min-h-0">
      <ui-input label="Фамилия" v-model="userInfo.secondname"/>
      <ui-input label="Имя" v-model="userInfo.firstname"/>
      <ui-input label="Отчество" v-model="userInfo.surname"/>
      <ui-input label="Студенческий билет" v-model="userInfo.stud_number" readonly/>
      <ui-input label="Группа" v-model="userInfo.group"/>
      <div class="flex place-items-center justify-center">
        <button class="btn-custom">
          Выбрать фото
        </button>
      </div>
      <div class="lg:col-span-2 flex place-items-center justify-center">
        <button class="btn-custom">
          Сохранить изменения
        </button>
      </div>

      <hr class="lg:col-span-2 mt-4" noshade style="height: 2px;">
      <span class="lg:col-span-2 text-center text-xl">
        Смена пароля
      </span>

      <ui-input label="Прежний пароль" type="password" placeholder="*******"/>
      <ui-input label="Новый пароль" type="password" placeholder="*******"/>
      <ui-input label="Повторите новый пароль" type="password" placeholder="*******"/>
      <div class="flex place-items-center justify-center">
        <button class="btn-custom">
          Сменить пароль
        </button>
      </div>
      
    </div>
  </MainBlockLkTemplate>
</template>

<script lang="ts" setup>
import MainBlockLkTemplate from '@/components/ui/MainBlockLkTemplate.vue'
import UiInput from '@/components/ui/Input.vue'
import { reactive } from 'vue';

const userInfo = reactive({
  secondname: 'Иванов',
  firstname: 'Иван',
  surname: 'Иванович',
  group: 'БИ-42',
  stud_number: '12345678'
})
</script>