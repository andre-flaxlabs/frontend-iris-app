import { createRouter, createWebHistory } from 'vue-router'
import OverviewView from '@/views/Dashboard/OverviewView.vue'
import CampaignsView from '@/views/CampaignsView.vue'
import ClientsView from '@/views/Dashboard/ClientsView.vue'
import SigninView from '@/views/Authentication/SigninView.vue'
import { useAuth } from '@/stores/auth'

import SignupView from '@/views/Authentication/SignupView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: OverviewView
    },
    {
      path: '/campaigns',
      name: 'campaigns',
      component: CampaignsView
    },
    {
      path: '/clients',
      name: 'clients',
      component: ClientsView
    },
    {
      path: '/auth/signin',
      name: 'signin',
      component: SigninView,
      meta: {
        title: 'Signin'
      }
    },
    {
      path: '/auth/signup',
      name: 'signup',
      component: SignupView,
      meta: {
        title: 'Signin'
      }
    }
  ]
})

router.beforeEach(async (to) => {
  const publicPages = ['/auth/signin']
  const authRequired = !publicPages.includes(to.path)
  const authStore = useAuth()

  const refreshCookies = localStorage.getItem('refresh')

  if (authRequired && authStore.accessToken === '' && !refreshCookies) {
    return {
      path: '/auth/signin'
    }
  }
})

export default router
