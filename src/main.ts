import { createApp } from 'vue'
import './styles/main.css'
import { createPinia } from 'pinia'
import App from './App.vue'
import initializeRouter from './router'

const app = createApp(App)

initializeRouter(app)
app.use(createPinia())

app.mount('#app')
