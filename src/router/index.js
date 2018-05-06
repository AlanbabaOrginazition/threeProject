import Vue from 'vue'
import Router from 'vue-router'
import AppMain from '@/components/AppMain'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'AppMain',
      component: AppMain,
      children: [{
        path: '2d',
        component: ()=> import('@/components/Container/2dMap/index')
      },
      {
        path: '3d',
        component: ()=> import('@/components/Container/3dMap/index')
      }]
    }
  ]
})
