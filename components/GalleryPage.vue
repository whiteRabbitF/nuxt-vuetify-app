<template>
  <div class="container">
    <div class="row">
      <!-- Отображаем фотографии только если они загружены -->
      <div class="col-12 col-sm-6 col-md-4 mb-4" v-for="(photo, index) in photos" :key="index">
        <div class="card h-100">
          <img :src="photo.url" class="card-img-top" alt="Photo" style="height: 200px; object-fit: cover;">
          <div class="card-body">
            <span class="card-title">Название фото: {{ photo.name }}</span>
          </div>
        </div>
      </div>
      <!-- Если фотографий нет, показываем сообщение -->
      <div class="col-12" v-if="photos.length === 0">
        <div class="alert alert-info" role="alert">Нет фотографий для отображения.</div>
      </div>
    </div>

    <!-- Кнопки на странице -->
    <div class="d-flex flex-row gap-3">
      <button class="btn btn-primary" @click="openModal">Добавить фотографию</button>
      <button class="btn btn-secondary" @click="$router.push('/')">Назад на главную</button>
    </div>

    <!-- Модальное окно для добавления фотографии -->
    <PhotoModal
        v-model="dialog"
        @add-photo="addPhoto"
    />
  </div>
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



