import type { App, Plugin } from 'vue'
import component from './VideoBackground.vue'

export const videoBackgroundPlugin: Plugin = {
  install(app: App): void {
    app.component('VideoBackground', component)
  },
}

export default component
