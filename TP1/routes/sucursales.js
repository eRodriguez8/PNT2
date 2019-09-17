const express = require('express');
const router = express.Router();
const models = require('../models');

router.get('/', (req, res) => {
    models.Sucursal.findAll()
        .then((rows) => {
            res.send(rows);
        });
});

router.get('/:id', (req, res) => {
    let id = req.params.id;

    models.Sucursal.findOne({
        where: {
            id: id
        }
    })
    .then((row) => {
        res.send(row);
    });
});

router.post('/', (req, res) => {
    let descripcion = req.body.descripcion;
    let direccion = req.body.direccion;
    
    console.log(req.body)

    models.Sucursal.create({
        descripcion: descripcion,
        direccion: direccion,
    }).then(() => {
        res.sendStatus(201);
    })
});

router.put('/:id', (req, res) => {
    let id = req.params.id;
    let descripcion = req.body.descripcion;
    let direccion = req.body.direccion;
    
    models.Sucursal.update(
        {
            descripcion: descripcion,
            direccion: direccion
        },
        {
            where: { id: id }
        }
    ).then(() => {
        res.sendStatus(200);
    })
});

router.delete('/:id', (req, res) => {
    let id = req.params.id;

    models.Sucursal.destroy({
        where: {
            id: id
        }
    }).then(() => {
        res.sendStatus(200);
    })
});

module.exports = router;