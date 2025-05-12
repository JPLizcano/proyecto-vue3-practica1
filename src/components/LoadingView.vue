<script setup lang="ts">
const props = defineProps<{
  isLoad: boolean
  msg: string
}>()
</script>

<template>
  <transition name="fade">
    <div v-if="props.isLoad" class="fixed inset-0 flex items-center justify-center backdrop-blur-sm text-2xl">
      {{ msg.toUpperCase() }}
    </div>
  </transition>
</template>

<style scoped>
/* Animación de desvanecimiento */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>