<template>
  <div class="q-pa-md row inline">
    <div>
      <q-btn-dropdown color="primary" label="Juegos">
        <q-list>
          <q-item clickable v-for="item in games" :key="item.id" @click="showGames(item.id)">
            <q-item-section>
              <q-item-label>{{item.name}}</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-btn-dropdown>
    </div>
    <div>
      <q-separator inset />
    </div>
    <div>
      <q-form v-on:submit="register" v-on:reset="reset">
        <q-input
          filled
          v-model="name"
          label="Nombre"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Por favor ingrese su nombre del juego']"
        />
        <q-separator />
        <div class="q-gutter-y-md">
          <q-btn label="Eliminar" type="button" color="primary" flat class="q-ml-sm rounded-borders"
          @click="deleteGames()"/>
          <q-btn label="Cancelar" type="reset" color="primary" flat class="q-ml-sm rounded-borders"/>
          <q-btn label="Guardar" type="button" color="primary" class="q-ml-sm rounded-borders"
          v-if="this.selectedId != -1" @click="editGame()"/>
          <q-btn v-else label="Guardar" type="submit" color="primary" class="q-ml-sm rounded-borders"/>
        </div>
      </q-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GamesLayout',
  data: function () {
    return {
      name: '',
      selectedId: -1,
      games: []
    }
  },
  methods: {
    register: function () {
      let headers = new Headers()
      headers.set('Content-type', 'application/json')
      let data = {
        name: this.name
      }
      fetch('http://localhost:5000/api/game', {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(data)
      }).then(result => {
        if (result.ok) {
          this.$q.notify({
            color: 'green-4',
            textColor: 'white',
            icon: 'power',
            message: 'Juego ' + this.name + ' creado!'
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
      this.name = ''
    },
    getGames: function () {
      let headers = new Headers()
      headers.set('Content-type', 'application/json')
      fetch('http://localhost:5000/api/game', {
        method: 'GET',
        headers: headers
      }).then(result => {
        return result.json()
      }).then(result => {
        this.games = result
      })
    },
    showGames: function (id) {
      let gameShowed = this.games.filter(x => x.id === id)
      this.selectedId = id
      this.name = gameShowed[0].name
    },
    deleteGames: function () {
      if (this.selectedId !== -1) {
        let headers = new Headers()
        headers.set('Content-type', 'application/json')
        fetch('http://localhost:5000/api/game/' + this.selectedId, {
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
          message: 'Seleccione un juego!'
        })
      }
    },
    editGame: function () {
      if (this.selectedId !== -1) {
        let headers = new Headers()
        headers.set('Content-type', 'application/json')
        let data = {
          name: this.name
        }
        fetch('http://localhost:5000/api/game/' + this.selectedId, {
          method: 'PUT',
          headers: headers,
          body: JSON.stringify(data)
        }).then(result => {
          if (result.ok) {
            this.$q.notify({
              color: 'green-4',
              textColor: 'white',
              icon: 'power',
              message: 'Juego Editado'
            })
            this.getGames()
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
    }
  },
  mounted () {
    this.getGames()
  }
}
</script>
