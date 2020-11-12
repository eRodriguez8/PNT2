const express = require('express');
const router = express.Router();
const models = require('../models');
const Sequelize = require('sequelize');

const Op = Sequelize.Op;

router.get('/', (req, res) => {
    let username = req.query.username;

    if (!req.query.games) {
        res.status(400).send('No se especificaron juegos.');
        return;
    }

    let games = req.query.games.split(',').map(Number);

    models.User.findOne({
        where: {
            username: username
        }
    }).then((user) => {
        if (user) {
            user.setGames(games);
            models.User.findAll({
                include: {
                    model: models.Game,
                    attributes: ['id', 'name'],
                    where: {
                        'id': { [Op.in]: games }
                    }
                },
                where: {
                    'username': { [Op.ne]: username }
                }
            }).then(rows => {
                res.send(rows);
            });
        } else {
            res.status(400).send('Usuario no encontrado');
        }
    });
});

module.exports = router;