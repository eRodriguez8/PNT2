const express = require('express');
const router = express.Router();
const models = require('../models');

router.get('/', (req, res) => {
    models.Game.findAll()
        .then((rows) => {
            res.send(rows);
        });
});

router.get('/:id', (req, res) => {
    let id = req.params.id;

    models.Game.findOne({
        where: {
            id: id
        }
    })
        .then((row) => {
            res.send(row);
        });
});

router.post('/', (req, res) => {
    let name = req.body.name;

    models.Game.create({
        name
    }).then((user) => {
        res.sendStatus(201);
    })
});

router.put('/:id', (req, res) => {
    let id = req.params.id;
    let name = req.body.name;

    models.Game.update(
        {
            name
        },
        {
            where: { id }
        }
    ).then(() => {
        res.sendStatus(200);
    })
});

router.delete('/:id', (req, res) => {
    let id = req.params.id;

    models.Game.destroy({
        where: {
            id
        }
    }).then(() => {
        res.sendStatus(200);
    })
});

module.exports = router;