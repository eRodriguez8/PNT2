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
      <input value="Login" type="button" class="btn form-control btn-primary">
      <input value="Register" type="button" class="btn form-control btn-primary">
    </div>
  </div>    
</template>

<script>
export default {
  name: 'Regsiter',
  props: {
    username: String,
    password: String,
    email: String
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
