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
    <div class="relative">
        <router-link to="/" class="absolute top-9 left-4">
            <svg width="40" height="40" viewBox="0 0 24 25" fill="none" transform="rotate(0 0 0)"
                class="fill-[#ff6e00] hover:fill-[rgb(255,140,0)] transition-colors duration-200">
                <path
                    d="M2 12.5C2 6.97766 6.47729 2.50098 11.9996 2.50098C17.5218 2.50098 21.9991 6.97766 21.9991 12.5C21.9991 18.0224 17.5218 22.4991 11.9996 22.4991C6.47729 22.4991 2 18.0224 2 12.5ZM11.4982 9.15521C11.2178 9.03915 10.8952 9.10341 10.6808 9.31801L8.04259 11.9578C7.89904 12.0945 7.80957 12.2874 7.80957 12.5012C7.80957 12.7277 7.90996 12.9307 8.06867 13.0682L10.6807 15.6821C10.8952 15.8967 11.2178 15.961 11.4981 15.8449C11.7785 15.7289 11.9612 15.4554 11.9612 15.152V13.2512L15.4402 13.2512C15.8544 13.2512 16.1902 12.9154 16.1902 12.5012C16.1902 12.087 15.8544 11.7512 15.4402 11.7512H11.9612V9.84817C11.9612 9.54478 11.7785 9.27127 11.4982 9.15521Z" />
            </svg>
        </router-link>
    </div>
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