<script setup lang="ts">
defineProps<{
  overlay: string
}>()
</script>

<template>
  <div
    class="video-overlay"
    :style="{ background: overlay }"
  />
</template>

<style scoped>
  .video-overlay{
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    position: absolute;
  }
</style>
