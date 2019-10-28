<template>
  <div class="matches">
    <ul>
      <li v-for="game in games">
        {{ game.name }} - {{ game.id }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Matches",
  data: function() {
    return {
      games: []
    };
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
