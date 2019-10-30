<template>
  <div class="q-pa-md row absolute-center" style="max-width: 600px">
    <q-form
      v-on:submit="login"
      v-on:reset="reset"
    >
      <q-input
        filled
        v-model="username"
        label="Usuario"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Por favor ingrese su nombre de usuario']"
      />
      <q-input
        filled
        type="password"
        v-model="password"
        label="Contraseña"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Por favor ingrese su contraseña']"
      />
      <q-input
        filled
        type="email"
        v-model="email"
        label="Email"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Por favor ingrese su email']"
      />
      <q-separator />
      <div class="q-gutter-y-md">
        <q-btn label="Ingresar" type="submit" color="primary" class="rounded-borders"/>
        <q-btn label="Cancelar" type="reset" color="primary" flat class="q-ml-sm rounded-borders" />
      </div>
    </q-form>
  </div>
</template>

<script>
export default {
  name: 'LoginLayout',
  data: function () {
    return {
      username: '',
      password: '',
      email: ''
    }
  },
  methods: {
    login: function () {
      let headers = new Headers()
      headers.set('Content-type', 'application/json')
      let data = {
        'username': this.username,
        'password': this.password,
        'email': this.email
      }
      fetch('http://localhost:5000/api/user', {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(data)
      }).then(result => {
        if (result.ok) {
          this.$store.commit('login', this.username, 'este es el token')
          this.$q.notify({
            color: 'green-4',
            textColor: 'white',
            icon: 'power',
            message: 'Bienvenido ' + this.username
          })
          this.$router.push('/')
        } else {
          this.$q.notify({
            color: 'red-4',
            textColor: 'white',
            icon: 'power',
            message: result.message
          })
        }
      })
    },
    reset: function () {
      this.username = ''
      this.password = ''
      this.email = ''
      this.$router.push('/')
    }
  }
}
</script>
