
import { createRouter, createWebHashHistory } from 'vue-router'

// import { createRouter, createWebHashHistory } from './grouter/index'

import Home from '../pages/home.vue'
import About from '../pages/about.vue'
import Trans from '../pages/trans.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
  {
    path: '/trans',
    name: 'Trans',
    component: Trans
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
