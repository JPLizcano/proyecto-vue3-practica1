<script setup lang="ts">
import axios from 'axios';
import ProductoCard from '../components/ProductoCard.vue';
import { useRoute } from 'vue-router'
import { API_URL } from '../config/api';
import { onMounted } from 'vue';
import { ref } from 'vue';

const isLoading = ref(true);
const route = useRoute()
const categoria = route.params.categoria;
interface Producto {
    nombre: string
    precio: number
    imagen: string
}
let ListaProductos = ref<Producto[]>([]);

const productos = async () => {
    try {
        const resp = await axios.get(`${API_URL}/Productos/categoria/${categoria}`);
        ListaProductos.value = await resp.data.map((p: any) => ({
            nombre: p.Nombre,
            precio: p.ValorVenta, // Mapear ValorVenta a Precio
            imagen: p.Img,
        }));
    } catch (error) {
        console.error(error);
    }
    setTimeout(() => {
        isLoading.value = false;
    }, 500);
}

/*
Codigo
CreatedAt
Estado
IDTipoProducto
Img
Nombre
Stock
UpdatedAt
ValorCompra
ValorVenta
idProducto
*/

onMounted(async () => {
    await productos();
})
</script>

<template>
    <div v-if="isLoading" class="m-5">
        <div class="my-9 flex justify-center">
            <div class="animate-pulse bg-gray-300 h-9 w-40 rounded"></div>
        </div>
        <div class="grid place-items-center gap-3 contGrid">
            <div v-for="n in 6" :key="n" class="pb-5">
                <div class="contCard animate-pulse bg-gray-300 h-60 w-60 rounded-[9px] p-4">
                    <div class="flex justify-center items-center">
                        <div class="bg-gray-400 h-32 w-32 rounded"></div>
                    </div>
                    <div class="mt-4">
                        <div class="bg-gray-400 h-7 w-[206px] rounded"></div>
                        <div class="bg-gray-400 h-7 w-20 rounded mt-2"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div v-else class="m-5">
        <div class="my-9 flex justify-center">
            <h1 class="text-3xl font-bold">{{ categoria }}</h1>
        </div>
        <div class="grid place-items-center gap-3 contGrid">
            <ProductoCard v-for="p in ListaProductos" :key="p.nombre" :producto="p" />
        </div>
    </div>
</template>

<style lang="css" scoped>
@media (min-width: 2500px) {
    .contGrid {
        grid-template-columns: repeat(9, minmax(0, 1fr));
    }
}

@media (max-width: 2499px) and (min-width: 2150px) {
    .contGrid {
        grid-template-columns: repeat(8, minmax(0, 1fr));
    }
}

@media (max-width: 2149px) and (min-width: 1920px) {
    .contGrid {
        grid-template-columns: repeat(7, minmax(0, 1fr));
    }
}

@media (max-width: 1919px) and (min-width: 1580px) {
    .contGrid {
        grid-template-columns: repeat(6, minmax(0, 1fr));
    }
}

@media (max-width: 1579px) and (min-width: 1320px) {
    .contGrid {
        grid-template-columns: repeat(5, minmax(0, 1fr));
    }
}

@media (max-width: 1319px) and (min-width: 1060px) {
    .contGrid {
        grid-template-columns: repeat(4, minmax(0, 1fr));
    }
}

@media (max-width: 1059px) and (min-width: 800px) {
    .contGrid {
        grid-template-columns: repeat(3, minmax(0, 1fr));
    }
}

@media (max-width: 799px) and (min-width: 540px) {
    .contGrid {
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }
}

@media (max-width: 539px) {
    .contGrid {
        grid-template-columns: repeat(1, minmax(0, 1fr));
    }
}
</style>