// src/utils/indexedDB.ts

export const openDatabase = () => {
    return new Promise<IDBDatabase>((resolve, reject) => {
        const request = indexedDB.open('photosDB', 1);

        request.onupgradeneeded = (event) => {
            const db = (event.target as IDBRequest).result;
            if (!db.objectStoreNames.contains('photos')) {
                db.createObjectStore('photos', { keyPath: 'url' });
            }
        };

        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject('Failed to open database');
    });
};

export const saveToIndexedDB = async (photo: { name: string; url: string }) => {
    const db = await openDatabase();
    const transaction = db.transaction('photos', 'readwrite');
    const store = transaction.objectStore('photos');
    store.put(photo); // добавляем или обновляем фото
    console.log('Фото сохранено в IndexedDB:', photo); // Логирование сохранения
    return new Promise<void>((resolve, reject) => {
        transaction.oncomplete = () => resolve();
        transaction.onerror = () => reject('Failed to save photo');
    });
};

export const loadFromIndexedDB = async (): Promise<{ name: string; url: string }[]> => {
    const db = await openDatabase();
    const transaction = db.transaction('photos', 'readonly');
    const store = transaction.objectStore('photos');
    const photos = store.getAll();

    return new Promise((resolve, reject) => {
        photos.onsuccess = () => {
            console.log('Загружены фотографии из IndexedDB:', photos.result); // Логирование загрузки
            resolve(photos.result);
        };
        photos.onerror = () => reject('Failed to load photos');
    });
};


