import { createApp } from 'vue'
import { createPinia } from 'pinia'
import 'leaflet/dist/leaflet.css'
import './styles/main.css'
import App from './App.vue'
import router from './router'

if (typeof window !== 'undefined' && 'scrollRestoration' in history) {
  history.scrollRestoration = 'manual'
  window.scrollTo(0, 0)
}

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.mount('#app')

