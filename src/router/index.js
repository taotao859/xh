import Vue from 'vue'
import Router from 'vue-router'
import login from "../components/Login.vue";
import mlmodel from "../components/mlmodel.vue";
import upload from "../components/upload.vue";
import agent from "../components/agent.vue";

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: login
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/mlmodel',
      name: 'mlmodel',
      component: mlmodel
    },
    {
      path: '/upload',
      name: 'upload',
      component: upload
    },
    {
      path: '/agent',
      name: 'agent',
      component: agent
    }
  ]
})
