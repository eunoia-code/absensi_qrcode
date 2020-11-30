import Vue from 'vue'
import App from './App.vue'
import Router from 'vue-router'

import Dashboard from '@/components/Dashboard'
import DashboardHome from '@/pages/Home'
import Dosen from '@/pages/Dosen'
import Mahasiswa from '@/pages/Mahasiswa'
import Matakuliah from '@/pages/Matakuliah'
import Jadwalkuliah from '@/pages/Jadwalkuliah'
import Pengaturan from '@/pages/Pengaturan'
import Login from '@/components/Login'

import store from './store'

import '@/assets/css/tailwind.css'
import VueSimpleAlert from "vue-simple-alert"

// import axios from 'axios';
// import VueAxios from 'vue-axios';
import AxiosPlugin from 'vue-axios-cors';

import vuetify from './plugins/vuetify';
import 'vuetify/dist/vuetify.min.css'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import 'font-awesome/css/font-awesome.css'

let vuePlugins = [
  AxiosPlugin, vuetify, VueSimpleAlert
];
vuePlugins.forEach((x) => Vue.use(x));
Vue.config.productionTip = false

const routes = [
  { path: '/', redirect: { name: 'DashboardHome' } },
  { path: '/admin', component: Dashboard, children: [
      { path: '/', redirect: { name: 'DashboardHome' } },
      { path: 'home', name: 'DashboardHome', component: DashboardHome },
      { path: 'dosen', name: 'Dosen', component: Dosen },
      { path: 'mahasiswa', name: 'Mahasiswa', component: Mahasiswa },
      { path: 'matakuliah', name: 'Matakuliah', component: Matakuliah },
      { path: 'jadwalkuliah', name: 'Jadwalkuliah', component: Jadwalkuliah },
      { path: 'pengaturan', name: 'Pengaturan', component: Pengaturan }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  }
]

const router = new Router({
  mode: 'history',
  routes
})

new Vue({
  render: h => h(App),
  router,
  vuetify,
  store
}).$mount('#app')
