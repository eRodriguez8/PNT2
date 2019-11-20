const express = require('express');
const router = express.Router();
const models = require('../models');

router.get('/', (req, res) => {
    models.User.findAll({
        include: { model: models.Game, attributes: ['id', 'name'] },
        attributes: ['id', 'username', 'email']
    }).then((rows) => {
        res.send(rows);
    });
});

router.get('/:id', (req, res) => {
    let id = req.params.id;

    models.User.findOne({
        include: { model: models.Game, attributes: ['id', 'name'] },
        attributes: ['id', 'username', 'email'],
        where: {
            id: id
        }
    })
        .then((row) => {
            res.send(row);
        });
});

router.post('/', (req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    let email = req.body.email;

    models.User.create({
        username,
        password,
        email
    }).then((user) => {
        res.sendStatus(201);
    })
});

router.put('/:id', (req, res) => {
    let id = req.params.id;
    let username = req.body.username;
    let password = req.body.password;
    let email = req.body.email;

    models.User.update({
        username,
        password,
        email
    },
    {
        where: { id }
    }).then(() => {
        res.sendStatus(200);
    })
});

router.delete('/:id', (req, res) => {
    let id = req.params.id;

    models.User.destroy({
        where: {
            id
        }
    }).then(() => {
        res.sendStatus(200);
    })
});

module.exports = router;