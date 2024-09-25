import './assets/index.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { VueQueryPlugin, QueryClient } from '@tanstack/vue-query'
import Vue3Toastify, { type ToastContainerOptions } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

import App from './App.vue'
import router from './router'
import VueCookies from 'vue3-cookies'

const queryClient = new QueryClient()

const vueQueryPluginOptions = {
  queryClient
}

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(VueCookies, {
  expireTimes: '30d',
  path: '/',
  domain: '',
  secure: true,
  sameSite: 'None'
})
app.use(VueQueryPlugin, vueQueryPluginOptions)
app.use(Vue3Toastify, {
  autoClose: 3000
} as ToastContainerOptions)

app.mount('#app')
