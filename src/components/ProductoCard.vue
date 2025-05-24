<script setup lang="ts">
interface Producto {
    id: number
    nombre: string
    precio: number
    imagen: string
}

const { producto } = defineProps<{ producto: Producto }>()
</script>

<template>
    <div class="w-60 rounded-lg border border-gray-300 bg-[rgb(255,250,245)] p-4 mb-5">
        <div class="flex justify-center">
            <img :src="producto.imagen" :alt="producto.nombre" class="w-32 h-32 object-cover rounded-md">
        </div>

        <div class="mt-4">
            <h3 class="text-lg font-semibold text-gray-900 truncate">{{ producto.nombre }}</h3>
            <p class="text-orange-600 font-bold text-lg mt-2">${{ Number(producto.precio).toLocaleString() }}</p>
        </div>
    </div>
</template>

<style scoped>
</style>