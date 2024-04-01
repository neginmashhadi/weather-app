import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import SelectedCity from '@/views/SelectedCity.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home-page',
      component: HomeView
    },
    {
      path: '/weather/:state:city',
      name: 'selectedCity',
      component: SelectedCity
    },
  ]
})

export default router
