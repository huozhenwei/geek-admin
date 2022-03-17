import { createApp } from 'vue'

import Element3 from 'element3'
import 'element3/lib/theme-chalk/index.css'

import App from './App.vue'
import store from './store/index'

import router from './router/index'

createApp(App)
.use(router)
.use(store)
.use(Element3)
.mount('#app')
