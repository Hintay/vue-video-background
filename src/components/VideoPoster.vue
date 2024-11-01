<script setup lang="ts">
defineProps<{
  poster: string
}>()
</script>

<template>
  <div
    class="video-buffering"
    :style="{
      backgroundImage: `url(${poster})`,
    }"
  />
</template>

<style scoped>
  .video-buffering{
    width: 100%;
    overflow: hidden;
    background-size: cover;
    background-position: center;
    height: 100%;
    top: 0;
    left: 0;
    position: absolute;
  }
</style>
