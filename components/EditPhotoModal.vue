<template>
  <v-dialog v-model="dialog" persistent max-width="450px" class="delete-wrapper">
    <v-card class="card">
      <v-card-title class="col-8 mx-auto">Редактирование картины</v-card-title>
      <v-card-text>
        <v-img v-if="photoUrl" :src="photoUrl" height="200px" class="mt-2" />
        <v-text-field v-model="photoName" label="Название фотографии" required></v-text-field>
        <v-text-field v-model="photoUrl" label="URL фотографии" required></v-text-field>
      </v-card-text>
      <v-card-actions class="col-8 mx-auto">
        <v-btn color="secondary" @click="closeModal">Отмена</v-btn>
        <v-btn color="green" @click="editPhoto">Сохранить</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref, watch, defineProps, defineEmits } from 'vue';
import { usePhotos } from '~/stores/photos';
import { VDialog, VCard, VCardTitle, VCardText, VCardActions, VBtn, VImg, VTextField } from 'vuetify/components';

const emit = defineEmits(['update:modelValue', 'edit-photo']);

// Пропсы, передаваемые от родительского компонента
const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true
  },
  photo: {
    type: Object,
    required: true
  }
});

// Локальные состояния для редактирования
const dialog = ref(props.modelValue);
const photoName = ref(props.photo?.name || ''); // Проверка на null/undefined
const photoUrl = ref(props.photo?.url || '');  // Проверка на null/undefined

// Функции для работы с модалкой
const closeModal = () => {
  emit('update:modelValue', false); // Закрытие модального окна
};

// Функция для редактирования фото
const editPhoto = () => {
  if (photoName.value && photoUrl.value) {
    const updatedPhoto = { name: photoName.value, url: photoUrl.value };
    emit('edit-photo', updatedPhoto); // Уведомляем родителя о редактировании
    closeModal(); // Закрываем модальное окно
  } else {
    console.error('Название и URL не могут быть пустыми');
  }
};

// Слушаем изменения состояния modelValue и синхронизируем с dialog
watch(() => props.modelValue, (newValue) => {
  dialog.value = newValue;
});

// Слушаем изменения состояния photo и обновляем локальные данные
watch(() => props.photo, (newPhoto) => {
  if (newPhoto) {
    photoName.value = newPhoto.name || ''; // Проверка на наличие данных
    photoUrl.value = newPhoto.url || '';  // Проверка на наличие данных
  } else {
    photoName.value = '';
    photoUrl.value = '';
  }
});
</script>



<style lang="scss" scoped>
.delete-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;

  .card {
    padding: 20px;
  }
}
.modal-dialog {
  background: white;
  padding: 20px;
}
</style>
