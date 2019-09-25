import Vuex from 'vuex'
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(Vuex)

const routes = [
    { path: '/login', component: Login },
    { path: '/register', component: Register },
];

const router = new VueRouter({
    routes: routes
});