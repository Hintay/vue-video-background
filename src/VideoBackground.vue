<script setup lang="ts">
import type { Props } from './core/props.ts'
import { computed, onBeforeMount, onBeforeUnmount, onMounted, ref, useTemplateRef } from 'vue'
import VideoOverlay from './components/VideoOverlay.vue'
import VideoPlayer from './components/VideoPlayer.vue'
import VideoPoster from './components/VideoPoster.vue'
import { DefaultProps } from './core/props.ts'
import throttle from './lib/throttle.ts'

const props = withDefaults(defineProps<Props>(), DefaultProps)

const emits = defineEmits(['playing', 'error', 'loading', 'ended', 'ready'])

const player = useTemplateRef('player')

defineExpose({ player })

function playVideo() {
  emits('ready')
  if (!props.autoplay)
    return

  player.value?.play()
}

const width = ref(0)

const defaultValue = computed(() => ({
  src: props.src,
  poster: props.poster,
  autoplay: props.autoplay,
}))

const current = computed(() => {
  if (!props.sources || props.sources.length === 0)
    return defaultValue.value

  const current = props.sources.slice(0)
    .sort((a, b) => a.res - b.res)
    .filter(source => source.res >= width.value)

  if (current.length === 0)
    return defaultValue.value

  return current[0]
})

function innerWidth() {
  return window.innerWidth && document.documentElement.clientWidth
    ? Math.min(window.innerWidth, document.documentElement.clientWidth)
    : window.innerWidth
      || document.documentElement.clientWidth
      || document.getElementsByTagName('body')[0].clientWidth
}

function changeVideoResolution() {
  width.value = innerWidth()
}

onBeforeMount(() => {
  changeVideoResolution()
})

onMounted(() => {
  window.addEventListener('resize', throttle(changeVideoResolution, 250))
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', throttle(changeVideoResolution, 250))
})
</script>

<template>
  <section class="vue-responsive-video-bg">
    <VideoPoster
      v-if="current.poster || poster"
      :poster="current.poster || poster"
    />

    <VideoPlayer
      ref="player"
      :src="current.src"
      :muted="muted"
      :loop="loop"
      :preload="preload"
      :plays-when="playsWhen"
      :playback-rate="playbackRate"
      :transition="transition"
      :object-fit="objectFit"
      @ready="playVideo"
      @playing="$emit('playing')"
      @error="$emit('error')"
      @loading="$emit('loading')"
      @ended="$emit('ended')"
    />

    <VideoOverlay
      v-if="overlay"
      :overlay="overlay"
    />

    <div class="video-bg-content">
      <slot />
    </div>
  </section>
</template>

<style scoped>
  .vue-responsive-video-bg{
      background: none;
      position: relative;
      width: 100%;
      overflow: hidden;
    }
    .vue-responsive-video-bg .video-bg-content {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }
</style>
