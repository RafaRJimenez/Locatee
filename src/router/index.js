import Vue from 'vue'
import Router from 'vue-router'
import indexLocatee from '@/components/indexLocatee'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'indexLocatee',
      component: indexLocatee
    }
  ]
})
