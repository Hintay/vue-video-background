# Responsive Video Background Player for Vue3 ⚡️

<a href="https://www.npmjs.com/package/@hintay/vue-video-background">
  <img src="https://img.shields.io/npm/dt/@hintay/vue-video-background.svg" alt="Downloads">
</a>
<a href="https://www.npmjs.com/package/@hintay/vue-video-background">
  <img src="https://img.shields.io/npm/v/@hintay/vue-video-background" alt="Version">
</a>
<a href="https://www.npmjs.com/package/@hintay/vue-video-background">
  <img src="https://img.shields.io/npm/l/@hintay/vue-video-background.svg" alt="License">
</a>

![Laravel Tongue](https://raw.githubusercontent.com/Hintay/vue-video-background/master/demo/public/images/roadster.png)

**If you are looking to play video files in the background, you have found the best Vue package for it 😜**

 >**Prerequisites**: Vue 3
 >
 >This package is refactor by Hintay with Typescript. If you want use this package in Vue 2, please use original package by [avidofood](https://github.com/avidofood/vue-responsive-video-background-player).

## Installation in 2 Steps

### 1: Add with pnpm 💻
```bash
pnpm install @hintay/vue-video-background
```

### 2a: Install as a component

```javascript
import VideoBackground from '@hintay/vue-video-background'

Vue.component('video-background', VideoBackground)
```
### 2b: Install as a plugin
```javascript
import { videoBackgroundPlugin } from '@hintay/vue-video-background'

Vue.use(videoBackgroundPlugin)
```

### (3: Only for Nuxt.js users)
#### Nuxt.js v3
 >Thanks to [@Vertenz](https://github.com/avidofood/vue-responsive-video-background-player/issues/8#issuecomment-1192011721) for his instructions.

Create `plugins` directory and add `video-bg.client.ts` file with following:

**Note:** You can use other filename but `.client` is obligatory for client side render, cause you don't have the window at SSR.

```ts
import { defineNuxtPlugin } from '#app'
import { videoBackgroundPlugin } from '@hintay/vue-video-background'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(videoBackgroundPlugin)
})
```

Then you can use the `video-background` tag.

Refence: https://nuxt.com/docs/guide/directory-structure/plugins

## Usage - (or to make it runnable 🏃‍♂️)

### Easiest version 🔍

```html
 <video-background
    src="<your-video-path>.mp4"
    style="max-height: 400px; height: 100vh;"
 >
    <h1 style="color: white;">Hello welcome!</h1>
 </video-background>
```

### Advanced version 🌐

```html
 <video-background
    src="<your-default-video-path>.mp4"
    poster="/images/mainfoto.jpg"
    :sources="[
        {src: '<your-tablet-video-path>.mp4', res: 900, autoplay: true},
        {src: '<your-mobile-video-path>.mp4', res: 638, autoplay: true, poster: '<your-mobile-background-image-path>.png'}
    ]"
    style="max-height: 400px; height: 100vh;"
    overlay="linear-gradient(45deg,#2a4ae430,#fb949e6b)"
>
    <h1 style="color: white;">Hallo welcome!</h1>
</video-background>
```

### Demo ⚡️

https://avidofood.github.io/vue-responsive-video-background-player/

## Props

This package is for responsive videos depicting different video resolution. Have you ever visited my favorite car company <a href="https://tesla.com">Tesla</a>? Have a look, they use a lot of video background videos and are using different resolutions for each device.

### Props values

#### `src`

Type: `string` **(Required)**

This is your path to your video. You can just use this value for showing your video in every resolution.

 >**Warning** for [Vue CLI](https://cli.vuejs.org/guide/creating-a-project.html): You need to bind the source like this: ``:src="require(`@/assets/video/timelapse.mp4`)"``. [Read here why](https://github.com/avidofood/vue-responsive-video-background-player/issues/10#issuecomment-646959090)

#### `mime`

Type: `strings`

This is the MIME type for your video file to check if it is playable in the browser. If no string is provided, the MIME type will be extracted from the file extension.

For example: `https://example.com/video.mp4?autoplay=1` will extracted as`video/mp4`.

#### `poster`

Type: `string` (default: `''`)

This is your first background image that is shown before the video is loaded.

 >**Warning** for [Vue CLI](https://cli.vuejs.org/guide/creating-a-project.html): You need to bind the source like this: ``:src="require(`@/assets/img/logo.png`)"``. [Read here why](https://github.com/avidofood/vue-responsive-video-background-player/issues/10#issuecomment-646959090)

#### `sources`

Type: `Sources[]` (default: `[]`)

```ts
interface Sources {
  src: string
  res: number
  autoplay: boolean
  poster?: string
  mime?: string
}
```

This is the main reason for this package. I wanted to have the possibility to change the resolution of the video when the resize event is fired.

To make it work, sources is an array that contains objects. For example:

````ts
[{
  src: '<your-mobile-video-path>.mp4',
  res: 638,
  autoplay: true,
}]
````

To make it work you need at least `src`, `res`, `autoplay`.

`poster` and `mime` is optional.

`res` stand for resolution. This example means that between 0px and 638px of the window's width only the mobile video will be shown. After that your default `src`.

#### `autoplay`

Type: `boolean` (default: `true`)

The video is going to be played immediately when the video is ready. If you are setting it to false, you can start the video just by `videobackground.player.play()`. But remember to set `ref='videobackground'` to the `<VideoBackground>` tag, so that it can work.

#### `overlay`

Type: `string` (default: `''`)

If you love overlays, then copy the overlay from the advanced example.

#### `muted`

Type: `boolean` (default: `true`)

Warning. Videos are perhaps not played when unmuted.

#### `loop`

Type: `boolean` (default: `true`)

Loops through the video. You can catch the event `ended` to show only the poster.

#### `preload`

Type: `'none' | 'metadata' | 'auto' | ''` (default: `auto`)

Reference: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video#preload

#### `objectFit`

Type: `ObjectFit` (default: `cover`)

Set the video fits perfectly in the container

Reference: https://developer.mozilla.org/en-US/docs/Web/CSS/object-fit

#### `objectPosition`

Type: `ObjectPosition` (default: `center`)

Set the video fits position in the container

Reference: https://developer.mozilla.org/en-US/docs/Web/CSS/object-position

#### `playsWhen`

Type: `string` with video events name (default: `canplay`)

This is important, if you know that you might have users with bad internet speed, you should definitely use `canplaythrough`. Learn more in [video events](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video#events).

#### `playbackRate`

Type: `number` (default: `1.0`)

The `playbackRate` property sets the current playback speed of the video. [Example](https://www.w3schools.com/jsref/prop_video_playbackrate.asp) but negative values didn't work for me?

#### `transition`

Type: `string` (default: `fade`)

You can add your own transition styles here. If you set it to empty string, it won't show any transitions.

## Events

- `ready`: Video is loaded
- `playing`: Video is playing
- `paused`: Video is paused
- `error`: Video error
- `loading`: Video is loading
- `ended`: Video finished, only when `loop` is set to false
- `rested`: Video is rested

## Methods

If you happen to need more control over the player, you can use the internal methods. For that, you need to set `ref="videobackground"` to the HTML tag `<video-background>`. After that you can call all methods like this `videobackground.player.play()`.

- `play()`: Play the video
- `pause()`: Pauses the video
- `show()`: Shows the video
- `hide()`: Hides the video and the poster will be shown
- `load()`: Loads the video
- `reset()`: Reset the video player, seek time to `0`

## Credits

Now comes the best part! 😍
This package is based on

 - [avidofood/vue-responsive-video-background-player](https://github.com/avidofood/vue-responsive-video-background-player)
 - https://tesla.com

Oh come on. You read everything?? If you liked it so far, hit the ⭐️ button to give me a 🤩 face.
