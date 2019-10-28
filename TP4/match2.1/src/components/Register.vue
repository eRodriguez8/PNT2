<template>
  <div class="register">
    <div>
    <label for="producto">User:</label>
      <input
        type="text"
        v-model="username"
        class="custom-select-lg form-control browser-default mb-3"
      >
      <label for="cantidad">Password:</label>
      <input
        type="password"
        v-model="password"
        class="custom-select-lg form-control browser-default mb-3"
      >
      <label for="cantidad">Email:</label>
      <input
        type="email"
        v-model="email"
        class="custom-select-lg form-control browser-default mb-3"
      >
    </div>

    <div class="">
      <input 
        value="Register" 
        type="button" 
        class="btn form-control btn-primary" 
        v-on:click="register()"
      >
    </div>
  </div>    
</template>

<script>
export default {
  name: 'Regsiter',
  data: function () {
        return {
            username: '',
            password: '',
            email: ''
        }
  },
  methods: {
    matches: function() {
      this.$router.push('matches')
    },
    login: function() {
      this.$router.push('login')
    },
    register: function () {
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
        return result.json()
      }).then(result => {
        if (result.success) {
          this.login()
        } else {
          this.matches()
        }
      })
    }
  }
}
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
