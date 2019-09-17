const Sequelize = require('sequelize');
const Sucursal = require('./Sucursal');
const Automovil = require('./Automovil');
const Persona = require('./Persona');

let db = {};

const sequelize = new Sequelize('mainDb', null, null, {
    dialect: "sqlite",
    storage: "./mainDB.sqlite"
});

// const sequelize = new Sequelize('mainDb', null, null, {
//     dialect: "mssql",
//     dialectModulePath: 'sequelize-msnodesqlv8',
//     dialectOptions: {
//         connectionString: 'Server=localhost/SQLSERVER2017;Database=master; Trusted_Connection=yes;'
//       },
// });

sequelize.authenticate()
    .then(function () { console.log('Autenticado'); })
    .catch(function () { console.log('Error autenticando'); })

db.Automovil = Automovil(sequelize, Sequelize);
db.Sucursal = Sucursal(sequelize, Sequelize);
db.Persona = Persona(sequelize, Sequelize);

db.Automovil.associate(db);
db.Persona.associate(db);

sequelize.sync({ force: true })
    .then(function (err) {
        console.log('Modelo sincronizado.');
    });

module.exports = db;