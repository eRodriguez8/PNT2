const models = require('../models');

const config = require('../config.js');

let login = (req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    
    if (username && password) {
        models.User.findOne({
            where: { username: username }
        }).then((user) => {

            if (user && password === user.password) {

                res.json({
                    success: true,
                    message: 'Authentication successful!'
                });

            } else {
                res.status(403).json({
                    success: false,
                    message: 'Incorrect username or password'
                });
            }
        });
    } else {
        res.status(400).json({
            success: false,
            message: 'Authentication failed! Please check the request'
        });
    }
};

module.exports = {
    login: login
}