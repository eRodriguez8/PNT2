module.exports = (sequelize, Sequelize) => {

    let Automovil = sequelize.define('Automovil', {
        descripcion: Sequelize.STRING
    });

    
    Automovil.associate = (models) => {
        models.Automovil.belongsTo(models.Sucursal, {
            onDelete: "CASCADE",
            foreingKey: {
                allowNull: false
            }
        });
    }

    return Automovil;
};