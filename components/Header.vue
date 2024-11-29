<template>
  <header class="header">
    <nav>
      <ul>
        <li><NuxtLink to="/">Главная</NuxtLink></li>
        <li><NuxtLink to="/about">О проекте</NuxtLink></li>
      </ul>
    </nav>
  </header>
</template>

<script setup>

</script>

<style lang="scss" scoped>
.header {
  background-color: #f8f9fa;
  padding: 1rem;
  border-bottom: 1px solid #ddd;

  nav ul {
    display: flex;
    list-style: none;
    gap: 1rem;
  }
}
</style>
