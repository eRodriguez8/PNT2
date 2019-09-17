const express = require('express');
const bodyParser = require('body-parser');

const routerSucursales = require('./routes/sucursales');
const routerAutomoviles = require('./routes/automoviles');
const routerPersonas = require('./routes/personas');
const cors = require('cors');

const db = require('./models');

const app = express();

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(cors());
  
app.use('/persona', routerPersonas);
app.use('/automovil', routerAutomoviles);
app.use('/sucursal', routerSucursales);


app.listen(port=5000, () => {
  console.log('Servidor escuchando...');
});