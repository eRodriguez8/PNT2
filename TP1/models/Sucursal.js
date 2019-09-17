module.exports = (sequelize, Sequelize) => {

    let Sucursal = sequelize.define('Sucursal', {
        descripcion: Sequelize.STRING,
        direccion: Sequelize.STRING
    });

    return Sucursal;
};