<template>
  <v-container>
    <v-row>
      <!-- Отображаем фотографии только если они загружены -->
      <v-col v-for="(photo, index) in photos" :key="index" cols="12" sm="6" md="4">
        <v-card>
          <v-img :src="photo.url" height="200px" lazy="false"></v-img>
          <v-card-title>{{ photo.name }}</v-card-title>
        </v-card>
      </v-col>
      <!-- Если фотографий нет, показываем сообщение -->
      <v-col v-if="photos.length === 0" cols="12">
        <v-alert type="info">Нет фотографий для отображения.</v-alert>
      </v-col>
    </v-row>

    <!-- Кнопки на странице -->
    <div class="d-flex flex-row gap-3 btn-group">
      <v-btn color="primary" @click="openModal" class="btn">Добавить фотографию</v-btn>
      <v-btn color="secondary" to="/gallery" class="btn">Перейти к галерее</v-btn>
    </div>

    <!-- Модальное окно для добавления фотографии -->
    <PhotoModal
        v-model="dialog"
        @add-photo="addPhoto"
    />
  </v-container>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { usePhotos } from '~/stores/photos'; // Подключаем store с фотографиями
import PhotoModal from '~/components/PhotoModal.vue';
import { VDialog, VCard, VCardTitle, VCardText, VCardActions, VTextField, VBtn, VImg } from 'vuetify/components'
const { photos, loadPhotos, addPhoto: addPhotoToStore } = usePhotos();

// Состояние для отображения модального окна
const dialog = ref(false);

// Открытие модального окна
const openModal = () => {
  dialog.value = true;
};

// Функция для добавления фотографии в store
const addPhoto = (photo: { name: string; url: string }) => {
  addPhotoToStore(photo);  // Добавление фотографии в store
};

// Загрузка фотографий при монтировании компонента
onMounted(async () => {
  await loadPhotos();  // Загружаем фотографии из IndexedDB
});
</script>



<style lang="scss">
.btn-group {
  width: 50%;
  margin: 0 auto;
  .btn {
    &:hover {
      cursor: pointer;
      background-color: #0056b3 !important;
      transform: scale(1.05);
      transition: all 0.3s ease;
    }

    padding: 10px 20px;
    font-weight: bold;
  }
}

/* Анимация для кнопки */
.btn {
  transition: all 0.3s ease;
}

.btn:hover {
  transform: scale(1.1);
}
</style>



