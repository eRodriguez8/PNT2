<template>
  <div class="login">
    <div class="form-group">
      <label for="username">Username:</label>
      <input
        type="text"
        v-model="username"
        class="custom-select-lg form-control browser-default mb-3"
      >
      <label for="password">Password:</label>
      <input
        type="password"
        v-model="password"
        class="custom-select-lg form-control browser-default mb-3"
      >
    </div>

    <div class="form-group">
      <input
        value="Login"
        type="button"
        class="btn form-control btn-primary"
        v-on:click="login()"
      >
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data: function () {
        return {
            username: '',
            password: ''
        }
  },
  methods: {
    store: function(){
      this.$store.commit('login', this.username, 'este es el token')
    },
    registerUser: function() {
      this.$router.push('register')
    },
    match: function() {
      this.$router.push('matches')
    },
    login: function () {
      let headers = new Headers()
      headers.set('Content-type', 'application/json')
      let data = { 'username': this.username, 'password': this.password }
      fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(data)
      }).then(result => {
        return result.json()
      }).then(result => {
        if (result.success) {
          this.store()
          this.match()
        } else {
          this.registerUser()
        }
      })
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
