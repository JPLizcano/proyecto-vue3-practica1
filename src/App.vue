<script setup lang="ts">
import NavBar from './components/NavBar.vue';
import { useAuthStore } from './store/useAuthStore';

const authStore = useAuthStore();
authStore.checkSession();
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
