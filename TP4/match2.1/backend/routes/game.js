const express = require('express');
const router = express.Router();
const models = require('../models');

router.get('/', (req, res) => {
    models.Game.findAll()
        .then((rows) => {
            res.send(rows);
        });
});

module.exports = router;