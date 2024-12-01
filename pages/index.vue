<template>
  <section>
    <span class="ma-10 mb-10 d-block">Добавляйте фотографии и пополняйте свою галерею совершенно бесплатно!</span>
    <GalleryGrid class="m-lg-auto" />
  </section>
</template>

<script lang="ts" setup>
import GalleryGrid from '~/components/GalleryGrid.vue'
</script>

<style lang="scss" scoped>
section {
  text-align: center;
  //padding: 2rem;

  span {
    font-size: 30px;
  }
}
</style>
