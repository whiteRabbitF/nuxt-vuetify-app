<template>
  <div class="container">
    <div class="row">
      <div class="col-12 col-sm-6 col-md-4 mb-4" v-for="(photo, index) in photos" :key="index">
        <div class="card h-100">
          <img :src="photo.url" class="card-img-top" alt="Photo" style="height: 500px; object-fit: cover;">
          <div class="card-body">
            <span class="card-title">
              <strong>Название фото:</strong>
              {{ photo.name }}
            </span>
            <button
              class="btn btn-danger mt-2 delete"
              title="Удалить"
              @click="openDeleteModal(photo)">
              <img
                  alt="удалить"
                  src="../public/icons/trash.svg"
                  class="icon"
              >
            </button>
            <button
                class="btn btn-dark mt-2 delete"
                title="Редактировать"
                @click="openEditModal(photo)">
              <img
                  alt="редактировать"
                  src="../public/icons/edit.svg"
                  class="icon"
              >
            </button>
          </div>
        </div>
      </div>
      <div class="col-12" v-if="photos.length === 0">
        <div class="alert alert-info" role="alert">Нет фотографий для отображения.</div>
      </div>
    </div>

    <div class="d-flex flex-row gap-4 btn-group">
      <button class="btn btn-primary" @click="openModal">Добавить фотографию</button>
      <button class="btn btn-secondary" @click="$router.push('/gallery')">Перейти к галерее</button>
    </div>

    <!-- Модальные окна -->
    <PhotoModal
        v-model="dialog"
        @add-photo="addPhoto"
    />
      <DeletePhotoModal
      v-model="isOpen"
      :photo="photoToDelete"
      @close="closeModal"
      @delete="deletePhoto"
      />
    <EditPhotoModal
      v-model="editIsOpen"
      :photo="photoToEdit"
      @close="closeEditModal"
      @edit-photo="editPhoto"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { usePhotos } from '~/stores/photos';
import PhotoModal from '~/components/PhotoModal.vue';
import DeletePhotoModal from '~/components/DeletePhotoModal.vue';
import EditPhotoModal from "~/components/EditPhotoModal.vue";

const { photos, loadPhotos, addPhoto: addPhotoToStore, deletePhoto: deletePhotoFromStore, updatePhoto } = usePhotos();

const dialog = ref(false);
const isOpen = ref(false);
const editIsOpen = ref(false)// Для синхронизации с модалкой удаления
const photoToDelete = ref<{ name: string; url: string } | null>(null);
const photoToEdit = ref<{ name: string; url: string } | null>(null)
const openModal = () => {
  dialog.value = true;
};

const addPhoto = (photo: { name: string; url: string }) => {
  addPhotoToStore(photo);
};

onMounted(async () => {
  await loadPhotos();
});

const openDeleteModal = (photo: { name: string; url: string }) => {
  console.log('openDeleteModal triggered');
  console.log('Photo to delete:', photo);
  photoToDelete.value = photo;
  isOpen.value = true; // Открываем модалку удаления
  console.log('isOpen after setting:', isOpen.value);
};

const openEditModal = (photo: { name: string; url: string }) => {
  console.log('openDeleteModal triggered');
  console.log('Photo to delete:', photo);
  photoToEdit.value = photo;
  editIsOpen.value = true; // Открываем модалку удаления
  console.log('isOpen after setting:', editIsOpen.value);
};

const closeModal = () => {
  isOpen.value = false;
  photoToDelete.value = null;
};

const closeEditModal = () => {
  isOpen.value = false;
  //photoTo.value = null;
};

const deletePhoto = async () => {
  console.log('deletePhoto triggered');
  if (photoToDelete.value) {
    console.log('Deleting photo:', photoToDelete.value);
    await deletePhotoFromStore(photoToDelete.value.url);
    closeModal();
  }
};

const editPhoto = async (updatedPhoto: { name: string; url: string }) => {
  try {
    // Обновляем фотографию в хранилище Pinia
    await updatePhoto(updatedPhoto);
    console.log('Фото успешно обновлено:', updatedPhoto);
  } catch (error) {
    console.error('Ошибка при обновлении фотографии:', error);
  }
};
</script>




<style lang="scss">
.btn-group {
  width: 50%;
  margin: 0 auto;
}

/* Анимация для кнопки */
.btn {
  transition: all 0.3s ease;
}

.btn:hover {
  transform: scale(1.1);
}
.card-body {
  display: flex;
  align-items: center;
  justify-content: space-between;
  .card-title {
    display: flex;
    width: 50%;
    flex-wrap: wrap;
    text-align: left;
  }
  .delete {
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;

    .icon {
      width: 20px;
      height: 20px;
    }
  }
}
</style>



