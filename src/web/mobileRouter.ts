import Vue from 'vue'
import Router from 'vue-router'
import Demo from './views/mobile/Demo.vue'

Vue.use(Router)

export default new Router({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Demo
    },
    {
      path: '/interface',
      name: 'interface',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "interface" */ './views/mobile/Interface.vue')
    },
    {
      path: '/VoteConfirm',
      name: 'VoteConfirm',
      component: () => import(/* webpackChunkName: "interface" */ './views/mobile/VoteConfirm.vue')
    }
  ]
})
