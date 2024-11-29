<template>
  <v-dialog v-model="dialog" max-width="500px" persistent hide-overlay>
    <v-card>
      <v-card-title>
        <span class="text-h5">Добавить фотографию</span>
      </v-card-title>
      <v-card-text>
        <v-text-field v-model="photoName" label="Название фотографии" required></v-text-field>
        <v-text-field v-model="photoUrl" label="URL фотографии" required></v-text-field>
        <v-img v-if="photoUrl" :src="photoUrl" height="200px" class="mt-2" />
      </v-card-text>
      <v-card-actions>
        <v-btn @click="closeModal">Отмена</v-btn>
        <v-btn color="primary" @click="addPhotoHandler">Добавить</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits, watch } from 'vue'
import { VDialog, VCard, VCardTitle, VCardText, VCardActions, VTextField, VBtn } from 'vuetify/components'
// Состояния для модального окна и данных фотографии
const photoName = ref('')
const photoUrl = ref('')

// Принимаем пропс для управления видимостью модального окна
const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true
  }
})

// Эмитим событие для управления видимостью модального окна
const emit = defineEmits(['update:modelValue', 'add-photo'])

// Синхронизируем локальную переменную `dialog` с `modelValue`
const dialog = ref(props.modelValue)

// Обработчик для закрытия модального окна
const closeModal = () => {
  emit('update:modelValue', false) // Закрытие модального окна
}

// Обработчик для добавления фотографии
const addPhotoHandler = () => {
  if (photoName.value && photoUrl.value) {
    // Эмитим событие с данными фотографии
    emit('add-photo', { name: photoName.value, url: photoUrl.value })
    closeModal()  // Закрытие модального окна
    photoName.value = ''  // Очищаем поля
    photoUrl.value = ''
  }
}

// Наблюдаем за изменением `modelValue` и обновляем локальную переменную `dialog`
watch(() => props.modelValue, (newValue) => {
  dialog.value = newValue
})

</script>



<style lang="scss">
/* Добавляем стиль для анимации */
.v-dialog {
  transition: opacity 0.3s ease, transform 0.3s ease !important;
}

.v-card {
  border-radius: 12px;
}

.v-card-title {
  font-size: 18px;
  font-weight: bold;
}

.v-btn {
  font-weight: bold;
  margin-right: 10px;
}
</style>


