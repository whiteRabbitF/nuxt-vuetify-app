import { defineStore } from 'pinia';
import { reactive } from 'vue';
import { saveToIndexedDB, loadFromIndexedDB, deleteFromIndexedDB } from '~/utils/indexedBD';

export const usePhotos = defineStore('photos', () => {
    const photos = reactive<{ name: string; url: string }[]>([]);

    // Загрузка фотографий
    const loadPhotos = async () => {
        try {
            const savedPhotos = await loadFromIndexedDB();
            photos.splice(0, photos.length, ...savedPhotos);
        } catch (error) {
            console.error('Failed to load photos from IndexedDB:', error);
        }
    };

    // Добавление фотографии
    const addPhoto = async (photo: { name: string; url: string }) => {
        photos.push(photo);
        try {
            await saveToIndexedDB(photo);
        } catch (error) {
            console.error('Failed to save photo to IndexedDB:', error);
        }
    };

    // Удаление фотографии
    const deletePhoto = async (url: string) => {
        const index = photos.findIndex(photo => photo.url === url);
        if (index !== -1) {
            photos.splice(index, 1);
        }

        try {
            await deleteFromIndexedDB(url);
        } catch (error) {
            console.error('Failed to delete photo from IndexedDB:', error);
        }
    };

    const editPhoto = async (updatedPhoto: { name: string; url: string }) => {
        const index = photos.findIndex(photo => photo.url === updatedPhoto.url);
        if (index !== -1) {
            photos[index] = updatedPhoto; // Обновляем фото в массиве
        }

        try {
            await saveToIndexedDB(updatedPhoto); // Сохраняем изменения в IndexedDB
        } catch (error) {
            console.error('Failed to update photo in IndexedDB:', error);
        }
    };

    const updatePhoto = async (updatedPhoto: { name: string; url: string }) => {
        const index = photos.findIndex((photo) => photo.url === updatedPhoto.url);
        if (index !== -1) {
            photos[index] = { ...photos[index], ...updatedPhoto }; // Обновляем данные локально
        }

        try {
            await saveToIndexedDB(updatedPhoto); // Обновляем данные в IndexedDB
            console.log('Фотография успешно обновлена в IndexedDB:', updatedPhoto);
        } catch (error) {
            console.error('Ошибка при обновлении фотографии в IndexedDB:', error);
        }
    };

    return {
        photos,
        loadPhotos,
        addPhoto,
        deletePhoto,
        editPhoto,
        updatePhoto
    };
});





