<script setup lang="ts">
import { onMounted, ref, useTemplateRef, watch } from 'vue'
import { DefaultProps, type Props } from '../core/props'

const props = withDefaults(defineProps<Props>(), DefaultProps)

const emits = defineEmits(['playing', 'paused', 'error', 'loading', 'ended', 'ready', 'rested'])

const playerRef = useTemplateRef('player')
const showVideo = ref(false)
const ready = ref(false)

function show() {
  showVideo.value = true
}

function hide() {
  showVideo.value = false
}

function play() {
  if (!playerRef.value)
    return

  if (!ready.value) {
    watch(ready, play, { once: true })
    return
  }

  setPlaybackRate()
  playerRef.value.play()
  show()
}

function pause() {
  if (!playerRef.value)
    return

  playerRef.value.pause()
}

function load() {
  if (!playerRef.value)
    return

  hide()

  // ugly, but we want to give hide 1 sec pause until we load the next video
  setTimeout(() => {
    playerRef.value?.load()
    emits('loading')
  }, 1000)
}

function reset() {
  if (!playerRef.value)
    return

  playerRef.value.pause()
  playerRef.value.currentTime = 0
  emits('rested')
}

function getMediaType(src: string) {
  return props.mime ?? `video/${src.split('.').pop()?.split(/[?#]/)[0]}`
}

function videoReady() {
  // Unfortunately we have the iOS bug, that we need to set autoplay always to true.
  // That means we need to first pause the video,
  // and later check if we want to autoplay or not
  ready.value = true
  pause()
  emits('ready')
}

function setPlaybackRate() {
  if (!playerRef.value)
    return

  playerRef.value.playbackRate = props.playbackRate
  playerRef.value.defaultPlaybackRate = props.playbackRate
}

defineExpose({
  play,
  pause,
  load,
  show,
  hide,
  reset,
})

onMounted(() => {
  if (!playerRef.value)
    return

  if (playerRef.value.canPlayType(getMediaType(props.src)) !== '') {
    playerRef.value[`on${props.playsWhen}`] = videoReady
  }
})

watch(() => props.src, load)
</script>

<template>
  <transition :name="transition">
    <div
      v-show="showVideo"
      class="video-wrapper"
    >
      <video
        ref="player"
        autoplay
        playsinline
        :muted
        :loop
        :preload
        :style="{
          objectFit,
        }"
        @error="emits('error')"
        @ended="emits('ended')"
        @playing="emits('playing')"
        @pause="emits('paused')"
      >
        <source
          :src="src"
          :type="getMediaType(src)"
        >
      </video>
    </div>
  </transition>
</template>

<style scoped>
  .video-wrapper{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    position: absolute;
    height: 100%;
    overflow: hidden;
    z-index: 0;
  }

  .fade{
    backface-visibility: hidden;
  }
  .fade-enter-active{
    transition: opacity 1s;
  }
  .fade-leave-active{
    transition: opacity 1s;
  }
  .fade-enter{
    opacity: 0;
  }
  .fade-leave-to{
    opacity: 0;
  }

  video {
    visibility: visible;
    pointer-events: none;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    height: 100%;
    width: 100%;
  }
</style>
