<script setup lang="ts">
import NavBar from './components/NavBar.vue'
</script>

<template>
  <div id="app" v-cloak>
    <NavBar />
    <router-view />
  </div>
</template>

<style scoped>
/* Estilos opcionales */
</style>
