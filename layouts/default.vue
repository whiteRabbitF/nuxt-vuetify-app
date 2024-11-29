<template>
  <div>
    <Header />
    <main>
      <slot />
    </main>
    <Footer />
  </div>
</template>

<script lang="ts" setup>
import Header from '~/components/Header.vue';
import Footer from '~/components/Footer.vue';
</script>

<style lang="scss">
main {
  min-height: 80vh;
  padding: 2rem;
}
</style>
