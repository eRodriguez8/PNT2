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
        v-on:submit="login"
        v-on:reset="reset"
      >
      <q-input
        filled
        v-model="username"
        label="Usuario"
        hint="Nombre del Usuario"
      />
      <q-separator />
      <div class="q-gutter-y-md">
        <q-btn label="Cancelar" type="reset" color="primary" flat class="q-ml-sm rounded-borders"/>
        <q-btn label="Buscar" type="submit" color="primary" class="q-ml-sm rounded-borders"/>
      </div>
      </q-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MatchesLayout',
  data: function () {
    return {
      username: '',
      matches: [],
      users: []
    }
  },
  methods: {
    login: function () {
    },
    reset: function () {
      this.username = ''
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
    }
  },
  mounted () {
    this.getUsers()
  }
}
</script>
