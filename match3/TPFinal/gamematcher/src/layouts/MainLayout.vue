<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          icon="menu"
          aria-label="Menu"
        />

        <q-toolbar-title>
          Game Matcher Pro
        </q-toolbar-title>

        <div> {{ username }}</div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-grey-2"
    >
      <q-list>
        <q-item-label header>Menu Principal</q-item-label>
        <q-item clickable v-on:click="menuPrincipal">
          <q-item-section avatar>
            <q-icon name="school" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Menu Principal</q-item-label>
          </q-item-section>
        </q-item>
        <q-separator />
        <q-item clickable v-on:click="jugar">
          <q-item-section avatar>
            <q-icon name="school" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Jugar</q-item-label>
          </q-item-section>
        </q-item>
        <q-separator />
        <q-item clickable v-on:click="crearJuego">
          <q-item-section avatar>
            <q-icon name="school" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Editar Juego</q-item-label>
          </q-item-section>
        </q-item>
        <q-separator />
        <q-item clickable v-on:click="editarUsuario">
          <q-item-section avatar>
            <q-icon name="school" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Editar Usuarios</q-item-label>
          </q-item-section>
        </q-item>
        <q-separator />
        <q-item clickable v-on:click="logout">
          <q-item-section avatar>
            <q-icon name="exit_to_app" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Cerrar Sesión</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: 'MainLayout',
  data () {
    return {
      leftDrawerOpen: false
    }
  },
  computed: {
    username: function () {
      return this.$store.state.username
    }
  },
  methods: {
    logout: function () {
      this.$store.commit('logout')
      this.$q.notify({
        color: 'green-4',
        textColor: 'white',
        icon: 'cloud_done',
        message: 'Ha cerrado sesión'
      })
    },
    crearJuego: function () {
      this.$q.notify({
        color: 'green-4',
        textColor: 'white',
        icon: 'cloud_done',
        message: 'Crear Juego!'
      })
      this.$router.push('/games')
    },
    editarUsuario: function () {
      this.$q.notify({
        color: 'green-4',
        textColor: 'white',
        icon: 'cloud_done',
        message: 'Crear Usuario!'
      })
      this.$router.push('/users')
    },
    menuPrincipal: function () {
      this.$router.push('/')
    },
    jugar: function () {
      this.$router.push('/matches')
    }
  }
}
</script>
