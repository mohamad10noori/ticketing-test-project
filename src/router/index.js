import { createRouter, createWebHistory } from 'vue-router'
import Tickets from '../views/Tickets.vue'

const routes = [
  {
    path: '/',
    name: 'Tickets',
    component: Tickets
  },
  {
    path: '/new-ticket',
    name: 'NewTicket',
    component: () => import('../views/NewTicket.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
