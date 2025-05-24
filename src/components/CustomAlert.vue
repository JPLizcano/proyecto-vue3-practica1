<script setup lang="ts">
import { computed } from 'vue';
import { useAlert } from '../composables/useAlert';

const { visible, tipo, mensaje, pauseTimeout, resumeTimeout } = useAlert();

const claseAlerta = computed(() => {
    return {
        "bg-green-500 text-white": tipo.value === "success",
        "bg-red-500 text-white": tipo.value === "error",
        "bg-yellow-500 text-black": tipo.value === "warning",
    }
})

</script>

<template>
    <transition name="fade">
        <div v-if="visible" :class="['absolute px-4 py-2 rounded msg text-sm text-center cursor-default', claseAlerta]"
            @mouseenter="pauseTimeout" @mouseleave="resumeTimeout">
            {{ mensaje }}
        </div>
    </transition>
</template>

<style lang="css" scoped>
/* Animación de desvanecimiento */
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
    opacity: 0;
}

/* Estilos de la alerta */
.alert {
    background-color: rgb(255, 110, 0);
    color: white;
    padding: 10px;
    border-radius: 5px;
    text-align: center;
}
</style>