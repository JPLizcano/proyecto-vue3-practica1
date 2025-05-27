<script setup lang="ts">
interface Producto {
    nombre: string
    precio: number
    imagen: string
}

const { producto } = defineProps<{ producto: Producto }>()
</script>

<template>
    <div class="w-60 rounded-lg bg-[rgb(255,250,245)] p-4 mb-5" id="productCont">
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
#productCont {
    box-shadow: 0px 0px 15px 0px rgb(200, 200, 200);
}
</style>