const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const routerUser = require('./routes/user');
const routerGame = require('./routes/game');
const security = require('./security');
const match = require('./routes/match');

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.post('/api/login', security.login)

app.use('/api/user', routerUser);
app.use('/api/game', routerGame);
app.use('/api/searchusers', match);

app.listen(port=5000, () => {
    console.log('Server listen at port 5000 ...');
});