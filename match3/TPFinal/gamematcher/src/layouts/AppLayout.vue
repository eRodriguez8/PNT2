<template>
  <div>
    <MainLayout v-if="isLogged"></MainLayout>
    <LoginLayout v-else></LoginLayout>
  </div>
</template>

<script>
import LoginLayout from '../pages/LoginLayout'
import MainLayout from './MainLayout'

export default {
  name: 'AppLayout',
  components: {
    LoginLayout,
    MainLayout
  },
  computed: {
    isLogged: function () {
      return this.$store.getters.isLogged
    }
  }
}
</script>
