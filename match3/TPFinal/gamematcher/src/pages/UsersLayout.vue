<template>
  <div class="q-pa-md row inline">
    <div>
      <q-btn-dropdown color="primary" label="Usuarios">
        <q-list>
          <q-item v-for="item in users" :key="item.id">
            <q-item-section>
              <q-item-label>{{item.username}}</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-btn-dropdown>
    </div>
    <div>
      <q-form
      v-on:submit="register"
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
          <q-btn label="Guardar" type="submit" color="primary" class="rounded-borders"/>
          <q-btn label="Cancelar" type="reset" color="primary" flat class="q-ml-sm rounded-borders" />
        </div>
      </q-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserLayout',
  data: function () {
    return {
      username: '',
      password: '',
      email: '',
      users: []
    }
  },
  methods: {
    register: function () {
      let headers = new Headers()
      headers.set('Content-type', 'application/json')
      let data = {
        username: this.username,
        password: this.password,
        email: this.email
      }
      fetch('http://localhost:5000/api/user', {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(data)
      }).then(result => {
        if (result.ok) {
          console.log(result)
        }
      })
    },
    reset: function () {
      this.username = ''
      this.password = ''
      this.email = ''
      this.$router.push('/')
    },
    getUsers: function () {
      let headers = new Headers()
      headers.set('Content-type', 'application/json')
      fetch('http://localhost:5000/api/user', {
        method: 'GET',
        headers: headers
      }).then(result => {
        return result.json()
      }).then(result => {
        this.users = result
      })
    }
  },
  mounted () {
    this.getUsers()
  }
}
</script>
