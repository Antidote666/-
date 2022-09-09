import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/ ',
    component: () => import('@/views/Layout'),
    children: [
      {
        path: '/ ',
        component: () => import('@/views/Home')
      },
      {
        path: '/profile',
        component: () => import('@/views/My')
      },
      {
        path: '/qa',
        component: () => import(/* webpackChunkName: "base" */ '@/views/Qa')
      },
      {
        path: '/video',
        component: () => import(/* webpackChunkName: "base" */ '@/views/Video')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/Login')
  }
]

const router = new VueRouter({
  routes
})

export default router
