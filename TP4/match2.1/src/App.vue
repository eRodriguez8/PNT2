<template>
  <div id="app">
    <div id="nav">
    </div>
    <img alt="Vue logo" src="./assets/logo.png"><br>
    <router-link to="/login"> Ingresar </router-link>
    <router-view />
  </div>
</template>

<script>
import router from './router'
  export default {
    name: 'app',
    router
  }
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
