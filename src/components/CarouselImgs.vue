<script setup lang="ts">
import { ref, onMounted } from 'vue';
import ProductoCard from './ProductoCard.vue';

interface Producto {
    id: number
    tipo: number
    nombre: string
    imagen: string
    precio: number
    idCont: number
}
interface Props {
    long: number
    producto: Producto[]
}

const active = ref(0)
const props = defineProps<Props>()

onMounted(() => {
    console.log(props.producto)
    if (props.long <= 1) return;

    let i = 1;
    setInterval(() => {
        if (i >= props.long) {
            i = 0;
        }
        active.value = i
        i++
    }, 2000);
})

</script>

<template>
    <div class="relative slide">
        <div class="carousel-inner relative overflow-hidden w-60">
            <ProductoCard v-for="pr in producto" :key="pr.idCont" :producto="pr" :id="`slide-${pr.idCont}`" :class="[active === pr.idCont ? 'active' : 'left-full'
                , 'carousel-item inset-0 relative w-60 transform transition-all duration-500 ease-in-out']" />
        </div>
    </div>
</template>

<style scoped>
.carousel-inner {
    background: rgb(255,250,245);
    height: 243px;
    border-radius: 9px;
    box-shadow: 0px 0px 15px 0px rgb(200,200,200);
}

.left-full {
    left: -100%;
}

.carousel-item {
    float: left;
    position: relative;
    display: block;
    width: 100%;
    margin-right: -100%;
    backface-visibility: hidden;
}

.carousel-item.active {
    left: 0;
}
</style>