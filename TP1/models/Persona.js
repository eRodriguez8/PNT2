module.exports = (sequelize, Sequelize) => {

    let Persona = sequelize.define('Persona', {
        nombreCompleto: Sequelize.STRING,
        tipo: Sequelize.STRING
    });

    
    Persona.associate = (models) => {
        models.Persona.belongsTo(models.Sucursal, {
            onDelete: "CASCADE",
            foreingKey: {
                allowNull: false
            }
        });
    }
    return Persona;
};