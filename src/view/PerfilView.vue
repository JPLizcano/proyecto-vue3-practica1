<script setup lang="ts">
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../store/useAuthStore';

const authStore = useAuthStore();
const router = useRouter();

onMounted(async () => {
    await authStore.checkSession();
    if (!authStore.isAuthenticated) {
        router.push('/');
    }
})

</script>

<template>

</template>

<style lang="css" scoped></style>