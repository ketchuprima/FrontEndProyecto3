import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import VueRouter from 'vue-router';
import Home from './components/Home.vue'
import Portada from './components/Portada.vue'
import Modal from './components/ModalVerOferta.vue'
import AdminPanel from './components/AdminPanel.vue'

Vue.config.productionTip = false

Vue.use(VueRouter);

const routes = [
  {path: '/home', name: 'home',component: Home},
  {path: '', name: 'portada', component: Portada},
  {path: '/', name: 'portada', component: Portada},
  {path: '/portada', name: 'portada', component: Portada},
  {path: '/adminPanel', name: 'adminPanel', component: AdminPanel},
  {path: '/maykheltesting', component: Modal},

  
];


const router = new VueRouter({
  routes,
  mode: 'history'
});

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
