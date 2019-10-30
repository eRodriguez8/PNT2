module.exports = (sequelize, Sequelize) => {

    let Game = sequelize.define('Game', {
        name: Sequelize.STRING,
    });

    return Game;
};