// src/stores/photos.ts
import { defineStore } from 'pinia';
import { reactive } from 'vue';
import { saveToIndexedDB, loadFromIndexedDB } from '~/utils/indexedBD';

export const usePhotos = defineStore('photos', () => {
    // Состояние для списка фотографий
    const photos = reactive<{ name: string; url: string }[]>([]);

    // Загрузка фотографий из IndexedDB
    const loadPhotos = async () => {
        try {
            const savedPhotos = await loadFromIndexedDB();
            photos.splice(0, photos.length, ...savedPhotos); // Обновляем массив с фотографиями
            console.log('Загружены фотографии:', photos); // Логирование
        } catch (error) {
            console.error('Failed to load photos from IndexedDB:', error);
        }
    };

    // Добавление фотографии в список и сохранение в IndexedDB
    const addPhoto = async (photo: { name: string; url: string }) => {
        photos.push(photo); // Добавляем фотографию в состояние
        console.log('Добавлена фотография:', photo); // Логирование
        try {
            await saveToIndexedDB(photo); // Сохраняем в IndexedDB
        } catch (error) {
            console.error('Failed to save photo to IndexedDB:', error);
        }
    };

    return { photos, loadPhotos, addPhoto };
});





