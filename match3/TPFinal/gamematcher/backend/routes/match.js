const express = require('express');
const router = express.Router();
const models = require('../models');

router.get('/', (req, res) => {
    let username = req.query.username;
    let games = req.query.games.split(',');
    let users = [];

    models.User.findOne({
        where: {
            username: username
        }
    }).then((user) => {

        if (user) {
            user.setGames(games);
            
            matches = []
            games.forEach(game => {
                
                models.User.findAll({
                    where: {
                        'Games.id': game.id
                    }
                }).then(users => {

                    console.log(users);

                    
                });
            });
        }
    });

    res.send(users);
});

module.exports = router;