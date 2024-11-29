<template>
  <section>
    <h1>Добро пожаловать в галерею!</h1>
    <span>Добавляйте фотографии и пополняйте свою галерею совершенно бесплатно!</span>
    <GalleryGrid />
  </section>
</template>

<script lang="ts" setup>
import GalleryGrid from '~/components/GalleryGrid.vue'
</script>

<style lang="scss" scoped>
section {
  text-align: center;
  padding: 2rem;
}
</style>
