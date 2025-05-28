<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'

interface Producto {
    nombre: string
    precio: number
    imagen: string
}
const { producto } = defineProps<{ producto: Producto }>()

const containerRef = ref()
const textRef = ref()
const shouldScroll = ref(false)
const transformStyle = ref('')
let scrollTimeout: ReturnType<typeof setTimeout> | null = null

const checkOverflow = () => {
    if (!containerRef.value || !textRef.value) return
    shouldScroll.value = textRef.value.scrollWidth > containerRef.value.offsetWidth
}

onMounted(() => {
    checkOverflow()
})

watch(() => producto.nombre, () => {
    // Verifica cada vez que cambie el nombre
    setTimeout(() => checkOverflow(), 100)
})

const startScroll = () => {
    if (!shouldScroll.value) return

    const containerWidth = containerRef.value.offsetWidth
    const textWidth = textRef.value.scrollWidth
    const distance = textWidth - containerWidth
    const speed = 30 // píxeles por segundo
    const duration = (distance / speed) * 500 // ms
    console.log(duration)
    // Mover al final
    transformStyle.value = `transform: translateX(0); transition: none;`
    // Delay pequeño para evitar "salto"
    setTimeout(() => {
        transformStyle.value = `transform: translateX(-${distance}px); transition: transform ${duration}ms linear;`
    }, 50)
}

const stopScroll = () => {
    if (!shouldScroll.value) return
    if (scrollTimeout) clearTimeout(scrollTimeout)

    // Reinicia al inicio
    transformStyle.value = `transform: translateX(0); transition: transform 500ms ease-out;`
}

</script>

<template>
    <div class="w-60 rounded-lg bg-[rgb(255,250,245)] p-4 mb-5" id="productCont">
        <div class="flex justify-center">
            <img :src="producto.imagen" :alt="producto.nombre" class="w-32 h-32 object-cover rounded-md">
        </div>
        <div class="mt-4">
            <!-- <h3 class="text-lg font-semibold text-gray-900 truncate">{{ producto.nombre }}</h3> -->
            <div class="relative w-full overflow-hidden group" ref="containerRef" @mouseenter="startScroll"
                @mouseleave="stopScroll">
                <div ref="textRef"
                    class="whitespace-nowrap inline-block transition-transform text-lg font-semibold text-gray-900"
                    :style="transformStyle">
                    {{ producto.nombre }}
                </div>
            </div>
            <p class="text-orange-600 font-bold text-lg mt-2">${{ Number(producto.precio).toLocaleString() }}</p>
        </div>
    </div>
</template>

<style scoped>
#productCont {
    box-shadow: 0px 0px 15px 0px rgb(200, 200, 200);
    cursor: default;
}
</style>