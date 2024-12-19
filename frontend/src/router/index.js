import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import passageiroView from '../views/passageiroView.vue'
import motoristaView from '../views/motoristaView.vue'
import corridaView from '../views/corridaView.vue';
import documentacaoView from '../views/documentacaoView.vue';
import cadastroView from '../views/cadastroView.vue'
import perfilView from '../views/perfilView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/passageiroView',
      name: 'passageiroView',
      component: passageiroView
    },
    {
      path: '/motoristaView',
      name: 'motoristaView',
      component: motoristaView
    },
    {
      path: '/corridaView',
      name: 'corridaView',
      component: corridaView
    },
    {
      path: '/documentacaoView',
      name: 'documentacaoView',
      component: documentacaoView
    },
    {
      path: '/cadastroView',
      name: 'cadastroView',
      component: cadastroView
    },
    {
      path: '/perfilView',
      name: 'perfilView',
      component: perfilView
    }
  ]
})

export default router
