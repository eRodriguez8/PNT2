module.exports = (sequelize, Sequelize) => {

    let User = sequelize.define('User', {
        username: Sequelize.STRING,
        password: Sequelize.STRING,
        email: Sequelize.INTEGER
    });

    return User;
};