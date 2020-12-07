import Vue from 'vue'
import App from './App.vue'
import Router from 'vue-router'

import Dashboard from '@/components/Dashboard'
import DashboardHome from '@/pages/Home'
import Daftaruser from '@/pages/Daftaruser'
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

function loggedInRedirectDashboard(to, from, next) {
  if (localStorage.token) {
    next('/');
  } else {
    next();
  }
}

function isLoggedIn(to, from, next) {
  if (localStorage.item) {
    next();
  } else {
    next('/login');
  }
}

function isAdmin(to, from, next) {
  if (JSON.parse(localStorage.item).level == 0) {
    next();
  } else {
    next('/');
  }
}

const routes = [
  { path: '/', redirect: { name: 'DashboardHome', beforeEnter: isLoggedIn } },
  { path: '/user', component: Dashboard, children: [
      { path: '/', redirect: { name: 'DashboardHome', beforeEnter: isLoggedIn } },
      { path: 'home', name: 'DashboardHome', component: DashboardHome, beforeEnter: isLoggedIn },
      { path: 'daftaruser', name: 'Daftaruser', component: Daftaruser, beforeEnter: isAdmin },
      { path: 'dosen', name: 'Dosen', component: Dosen, beforeEnter: isLoggedIn },
      { path: 'mahasiswa', name: 'Mahasiswa', component: Mahasiswa, beforeEnter: isLoggedIn },
      { path: 'matakuliah', name: 'Matakuliah', component: Matakuliah, beforeEnter: isLoggedIn },
      { path: 'jadwalkuliah', name: 'Jadwalkuliah', component: Jadwalkuliah, beforeEnter: isLoggedIn },
      { path: 'pengaturan', name: 'Pengaturan', component: Pengaturan, beforeEnter: isLoggedIn }
    ], beforeEnter: isLoggedIn
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    beforeEnter: loggedInRedirectDashboard
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
