const Sequelize = require('sequelize');
const User = require('./user');
const Game = require('./game');

let db = {};

const sequelize = new Sequelize('gameDB', null, null, {
    dialect: "sqlite",
    storage: "./gameDB.sqlite"
});

sequelize.authenticate()
    .then(function () { console.log('Autenticado'); })
    .catch(function (err) { console.log('Error autenticando: ' + err); })

// Entities
db.User = User(sequelize, Sequelize);
db.Game = Game(sequelize, Sequelize);

// Relaciones
db.Game.belongsToMany(db.User, { through: 'UsersGames' });
db.User.belongsToMany(db.Game, { through: 'UsersGames' });


db.sync = function () {
    sequelize.sync({ force: true })
        .then(function (err) {
            console.log('Model syncronized.');

            let games = [ { 
                id: 1,
                name: 'Counter Strike'
            }, {
                id: 2,
                name: 'Pacman'
            }, {
                id: 3,
                name: 'Fortnite'
            }, {
                id: 4,
                name: 'Tetris'
            }, {
                id: 5,
                name: 'Half-life 3'
            } ];

            games.forEach(game => {
                db.Game.create(game);
            });
        });
}

// db.sync();

module.exports = db;