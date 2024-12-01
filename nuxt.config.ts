// nuxt.config.ts

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },

  // Подключение стилей
  css: [
    'vuetify/styles', // Подключение стилей Vuetify
    '~/assets/styles/css/main.css',
    'bootstrap/dist/css/bootstrap.min.css', // Подключение Bootstrap
    '~/assets/styles/scss/custom-bootstrap.scss',
  ],

  // Настройки для сборки
  build: {
    transpile: ['vuetify'], // Транспилирование Vuetify, чтобы использовать его с ES-бандлами
  },

  // Настройка плагинов
  plugins: [
    '@/plugins/vuetify', // Плагин Vuetify
    '@/plugins/pinia',   // Плагин Pinia
  ],

  // Указания для роутинга
  router: {
    options: {
      strict: true, // Включаем строгий режим для роутера
    },
  },

  // Дополнительные опции для сервера
  server: {
    port: 3000, // Порт, на котором будет работать ваш Nuxt приложение
  },

  // Прочие возможные настройки
  buildModules: [
    '@nuxtjs/eslint-module', // Использование ESLint
  ],

  // Возможные изменения конфигурации хранилища и добавление дополнительных модулей
  ssr: true, // Включение серверного рендеринга (по умолчанию True)
})


