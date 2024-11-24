import Vue from 'vue'
import Router from 'vue-router'
import login from "../components/Login.vue";
import mlmodel from "../components/mlmodel.vue";
import upload from "../components/upload.vue";
import agent from "../components/agent.vue";
import home from "../components/home.vue";
import test from "../components/test.vue";
import telecom from "../components/telecom.vue";

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
      path: '/home',
      name: 'home',
      component: home
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
    },
    {
      path: '/telecom',
      name: 'telecom',
      component: telecom
    }
  ]
})
