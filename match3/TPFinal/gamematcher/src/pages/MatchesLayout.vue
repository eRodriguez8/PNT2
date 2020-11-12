<template>
  <div class="q-pa-md row inline">
    <div>
      <q-btn-dropdown color="primary" label="Juegos">
        <q-list>
          <q-item clickable v-for="item in games" :key="item.id" @click="addGames(item.id)">
            <q-item-section>
              <q-item-label>{{item.name}}</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-btn-dropdown>
    </div>
    <div v-if="gamesSelected && gamesSelected.length > 0" class="q-pa-md" style="max-width: 650px">
      <q-list dense bordered padding class="rounded-borders">
        <q-item clickable v-ripple v-for="item in gamesSelected" :key="item.id" @click="deleteGame(item.id)">
          <q-item-section>
            <q-item-label>{{item.name}}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
      <div class="q-gutter-y-md">
        <q-btn label="Buscar" type="button" color="primary"
        class="q-ml-sm rounded-borders" @click="buscarJugadores()"/>
      </div>
    </div>
    <div>
      <q-separator/>
    </div>
    <div>
      <q-separator inset />
    </div>
    <div v-if="users && users.length > 0" class="q-pa-md row inline">
      <div>
        <q-btn-dropdown color="primary" label="Usuarios">
          <q-list>
            <q-item clickable v-for="item in users" :key="item.id" @click="addUsers(item.id)">
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
      <div v-if="userSelected && userSelected.length > 0">
        <q-list dense bordered padding class="rounded-borders">
          <q-item clickable v-ripple v-for="item in userSelected" :key="item.id" @click="deleteUser(item.id)">
            <q-item-section>
              <q-item-label>{{item.username}}</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
        <div class="q-gutter-y-md">
          <q-btn label="Jugar" type="button" color="primary"
          class="q-ml-sm rounded-borders" @click="play()"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MatchesLayout',
  data: function () {
    return {
      username: '',
      name: '',
      selectedUserId: -1,
      selectedGameId: -1,
      matches: [],
      users: [],
      userSelected: [],
      games: [],
      gamesSelected: []
    }
  },
  methods: {
    reset: function () {
      this.username = ''
    },
    showUser: function (id) {
      let userShowed = this.users.filter(x => x.id === id)
      this.selectedUserId = id
      this.username = userShowed[0].username
    },
    addUsers: function (id) {
      let userToAdd = this.users.filter(x => x.id === id)
      this.userSelected.push(userToAdd[0])
    },
    deleteUser: function (id) {
      this.userSelected.splice(this.userSelected.findIndex(x => x.id === id), 1)
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
    addGames: function (id) {
      let gameToAdd = this.games.filter(x => x.id === id)
      this.gamesSelected.push(gameToAdd[0])
    },
    deleteGame: function (id) {
      this.gamesSelected.splice(this.gamesSelected.findIndex(x => x.id === id), 1)
    },
    buscarJugadores: function () {
      let headers = new Headers()
      headers.set('Content-type', 'application/json')
      let query = 'username=' + this.$store.state.username + '&games=' + this.gamesSelected.map(x => x.id).join(',')
      fetch('http://localhost:5000/api/searchusers?' + query, {
        method: 'GET',
        headers: headers
      }).then(result => {
        return result.json()
      }).then(result => {
        if (result && result.length > 0) {
          this.users = result
          this.$q.notify({
            color: 'green-4',
            textColor: 'white',
            icon: 'power',
            message: 'Usuario encontrado!'
          })
        } else {
          this.$q.notify({
            color: 'red-4',
            textColor: 'white',
            icon: 'power',
            message: 'Ups, no hay usuarios disponibles'
          })
        }
      })
    },
    play: function () {
      this.$router.push('/')
    }
  },
  mounted () {
    this.getGames()
  }
}
</script>
