<template>
  <div class="matches">
    <div class="form-group">
      <select class="form-control" @change="onChange($event)" v-model="idGameSelected">
      <option :selected="true">--Seleccione--</option>
      <option v-for="game in games" v-bind:value="game.id">{{ game.id }} - {{ game.name }}</option>
    </select>
    <input
      value="Buscar"
      type="button"
      class="btn col-xs-4 btn-primary"
      v-on:click="buscar()"
    >
    </div>
  </div>
</template>

<script>
export default {
  name: "Matches",
  data: function() {
    return {
      idGameSelected: -1,
      games: []
    }
  },
  methods: {
    getJuegos: function() {
      let headers = new Headers();
      headers.set("Content-type", "application/json");
      fetch("http://localhost:5000/api/game", {
        method: "GET",
        headers: headers
      })
      .then(result => {
        return result.json();
      })
      .then(result => {
        result.forEach(element => {
          this.games.push(element)         
        });
      });
    },
    buscar: function(){
      if(this.idGameSelected != -1){
        //enviar el seleccionado al backend
      }
    },
    onChange(event) {
      this.idGameSelected = event.target.value
    }
  },
  beforeMount() {
    this.getJuegos();
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
