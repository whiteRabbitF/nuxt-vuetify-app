// src/main.ts

import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'   // Подключаем Pinia
import { createVuetify } from 'vuetify' // Подключаем Vuetify
import Vuetify from 'vuetify';
import 'vuetify/styles'  // Подключаем стили Vuetify

const app = createApp(App)

// Используем Pinia для глобального состояния
app.use(createPinia())

// Используем Vuetify для интерфейса
app.use(createVuetify())
app.use(Vuetify);
// Монтируем приложение
app.mount('#app')
