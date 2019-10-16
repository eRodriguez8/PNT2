<template>
  <div class="login">
    <div>
      <label for="producto">Username:</label>
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
    </div>

    <div class>
      <input
        value="Login"
        type="button"
        class="btn form-control btn-primary"
        v-on:click="checkUser()"
      >
      <input 
        value="Register"
        type="button"
        class="btn form-control btn-primary"
        v-on:click="registerUser()"
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
    checkUser: function() {
        let data = {
            username: this.username,
            password: this.password
        }

        let headers = new Headers();
        headers.set('Content-type', 'application/json');
                
        fetch('http://localhost:5000/api/login', {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(data)
        })
        .then(function(response) {
            return response.json()
        })
        .then(function(datos) {
          // console.log(datos);
          return datos
        })
        .catch(function() {

        });        
    },
    registerUser: function() {
        let data = {
            username: this.username,
            password: this.password
        }

        let headers = new Headers();
        headers.set('Content-type', 'application/json');
                
        fetch('http://localhost:5000/api/user', {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(data)
        })
        .then(function(response) {
            return response.json()
        })
        .then(function(datos) {
          // console.log(datos);
          return datos
        })
        .catch(function() {

        });        
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
