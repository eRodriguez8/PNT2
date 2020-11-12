<template>
  <div class="q-pa-md row inline">
    <div>
      <q-btn-dropdown color="primary" label="Usuarios">
        <q-list>
          <q-item clickable v-for="item in users" :key="item.id" @click="showUser(item.id)">
            <q-item-section>
              <q-item-label>{{item.username}}</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-btn-dropdown>
    </div>
    <div>
      <q-separator inset />
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
        <div>
          <q-btn color="primary" label="Sacar Foto" @click="captureImage" />
          <img :src="imageSrc">
        </div>
        <q-separator />
        <div class="q-gutter-y-md">
          <q-btn label="Eliminar" type="button" color="primary" flat class="q-ml-sm rounded-borders"
          @click="deleteUsers()"/>
          <q-btn label="Cancelar" type="reset" color="primary" flat class="q-ml-sm rounded-borders"/>
            <q-btn label="Guardar" type="button" color="primary" class="q-ml-sm rounded-borders"
            v-if="this.selectedId != -1" @click="editUser()"/>
          <q-btn v-else label="Guardar" type="submit" color="primary" class="q-ml-sm rounded-borders"/>
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
      selectedId: -1,
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
          this.$q.notify({
            color: 'green-4',
            textColor: 'white',
            icon: 'power',
            message: 'Usuario ' + this.username + ' creado!'
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
      this.selectedId = -1
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
    },
    showUser: function (id) {
      let userShowed = this.users.filter(x => x.id === id)
      this.selectedId = id
      this.username = userShowed[0].username
      this.email = userShowed[0].email
    },
    deleteUsers: function () {
      if (this.selectedId !== -1) {
        let headers = new Headers()
        headers.set('Content-type', 'application/json')
        fetch('http://localhost:5000/api/user/' + this.selectedId, {
          method: 'DELETE',
          headers: headers
        }).then(result => {
          if (result.ok) {
            this.$router.push('/')
          }
        })
      } else {
        this.$q.notify({
          color: 'red-4',
          textColor: 'white',
          icon: 'power',
          message: 'Seleccione un usuario!'
        })
      }
    },
    editUser: function () {
      if (this.selectedId !== -1) {
        let headers = new Headers()
        headers.set('Content-type', 'application/json')
        let data = {
          username: this.username,
          password: this.password,
          email: this.email
        }
        fetch('http://localhost:5000/api/user/' + this.selectedId, {
          method: 'PUT',
          headers: headers,
          body: JSON.stringify(data)
        }).then(result => {
          if (result.ok) {
            this.$q.notify({
              color: 'green-4',
              textColor: 'white',
              icon: 'power',
              message: 'Usuario Editado'
            })
            this.$router.push('/')
          } else {
            this.$q.notify({
              color: 'red-4',
              textColor: 'white',
              icon: 'power',
              message: 'Ups, no se puedo guardar los cambios'
            })
          }
        })
      }
    },
    captureImage: function () {
      navigator.camera.getPicture(
        data => { // on success
          this.imageSrc = `data:image/jpeg;base64,${data}`
        },
        () => { // on fail
          this.$q.notify('Could not access device camera.')
        },
        {
          // camera options
        }
      )
    }
  },
  mounted () {
    this.getUsers()
  }
}
</script>
