<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'
import { API_URL } from '../config/api'
import CarouselImgs from '../components/CarouselImgs.vue';

interface Producto {
  id: number
  idCont: number
  imagen: string
  nombre: string
  precio: number
  tipo: number
}

interface TipoProducto {
  IDTipoProducto: number
  Nombre: string
}

const isLoading = ref(true);
const productos = ref<Producto[]>([])
const tiposProductos = ref<TipoProducto[]>([]);

const fetchProductos = async () => {
  try {
    const resp = await fetch(`${API_URL}/Productos/Listar`, {
      method: 'GET',
      headers: { "Content-Type": "application/json" },
      credentials: "include"
    })

    if (!resp.ok) {
      throw new Error(`Error HTTP: ${resp.status}`)
    }
    const data = await resp.json()
    productos.value = data[0]
  } catch (error) {
    console.error('Error al cargar Productos:', error)
  }
}

const fetchTipoProducto = async () => {
  try {
    const resp = await fetch(`${API_URL}/Productos/ListarTipos`, {
      method: 'GET',
      headers: { "Content-Type": "application/json" },
      credentials: "include"
    })

    if (!resp.ok) {
      throw new Error(`Error HTTP: ${resp.status}`)
    }

    const data = await resp.json()
    tiposProductos.value = data
  } catch (error) {
    console.error('Error al cargar los tipos de productos:', error)
  }
}

const getCategoriaNombre = (id: number) => {
  const map = tiposProductos.value.map((tp) => tp.Nombre);
  return map[id - 1] || "Otros"
}
const productosPorCategoria = computed(() => {
  return productos.value.reduce((acc: { [categoria: string]: { productos: Producto[]; contador: number } }, producto) => {
    const categoria = getCategoriaNombre(producto.tipo);
    if (!acc[categoria]) {
      acc[categoria] = { productos: [], contador: 0 };
    }
    producto.idCont = acc[categoria].contador++;
    acc[categoria].productos.push(producto);
    return acc;
  }, {});
});

onMounted(async () => {
  await fetchProductos()
  await fetchTipoProducto()
  setTimeout(async () => {
    isLoading.value = false
  }, 500);
})

</script>

<template>
  <div v-if="isLoading" class="m-5">
    <div class="my-9 flex justify-center">
      <div class="animate-pulse bg-gray-300 h-9 w-40 rounded"></div>
    </div>
    <div class="grid place-items-center gap-3 contGrid">
      <div v-for="n in 6" :key="n" class="pb-5">
        <div class="animate-pulse bg-gray-300 h-7 w-60 rounded mb-2"></div>
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
      <h1 class="text-3xl font-bold">Productos</h1>
    </div>
    <div class="grid place-items-center gap-3 contGrid">
      <router-link v-for="(item, categoria) in productosPorCategoria" :key="categoria" :id="categoria.toString()"
        :to="`/productos/${categoria}`">
        <h2 class="text-xl font-bold mb-2 text-center">{{ categoria }}</h2>
        <CarouselImgs :long="item.productos.length" :key="item.productos.toString()" :producto="item.productos"
          :id="`slide-${categoria.toString()}`" />
      </router-link>
    </div>

  </div>
</template>

<style scoped>
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
