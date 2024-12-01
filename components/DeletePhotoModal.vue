<template>
  <v-dialog v-model="dialog" persistent max-width="450px" class="delete-wrapper">
    <v-card class="card">
      <v-card-title class="col-8 mx-auto">Подтвердите удаление</v-card-title>
      <v-img :src="photoToDelete?.url" height="200px" class="mt-2" />
      <v-card-text>
        <span>Вы уверены, что хотите удалить фотографию "<strong>{{ photoToDelete?.name }}</strong>"?</span>
      </v-card-text>
      <v-card-actions class="col-8 mx-auto">
        <v-btn color="secondary" @click="closeModal">Отмена</v-btn>
        <v-btn color="red" @click="deletePhoto">Удалить</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref, watch, defineProps, defineEmits } from 'vue';
import { usePhotos } from '~/stores/photos';
import { VDialog, VCard, VCardTitle, VCardText, VCardActions, VBtn, VImg } from 'vuetify/components';

const emit = defineEmits(['update:modelValue', 'delete-photo']);

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

const dialog = ref(props.modelValue);
const photoToDelete = ref<{ name: string; url: string } | null>(props.photo);

// Функции для работы с модалкой
const closeModal = () => {
  emit('update:modelValue', false); // Закрытие модального окна
};

// Функция для удаления фото
const deletePhoto = async () => {
  console.log('deletePhoto triggered in modal');
  if (photoToDelete.value) {
    console.log('Deleting photo from modal:', photoToDelete.value);
    await usePhotos().deletePhoto(photoToDelete.value.url);
    emit('delete-photo', photoToDelete.value); // Эмитим событие для родителя, чтобы обновить состояние
    closeModal();
  }
};

// Слушаем изменения состояния modelValue и синхронизируем с dialog
watch(() => props.modelValue, (newValue) => {
  dialog.value = newValue;
});

// Слушаем изменения состояния photoToDelete
watch(() => props.photo, (newValue) => {
  photoToDelete.value = newValue;
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
