import type { App } from 'vue'
import component from './VideoBackground.vue'

export const Plugin = {
  install(app: App) {
    app.component('VideoBackground', component)
  },
}

export default component
