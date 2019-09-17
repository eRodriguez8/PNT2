const express = require('express');
const router = express.Router();
const models = require('../models');

router.get('/', (req, res) => {
    models.Automovil.findAll()
        .then((rows) => {
            res.send(rows);
        });
});

router.get('/:id', (req, res) => {
    let id = req.params.id;

    models.Automovil.findOne({
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
    let sucursalId = req.body.sucursalId;
        
    models.Sucursal.findOne({
        where: {
            id: sucursalId
        }
    })
    .then((sucursal) => {
        models.Automovil.create({
            descripcion: descripcion,
            sucursal: sucursal
        }).then(() => {
            res.sendStatus(201);
        })
    })
});

router.put('/:id', (req, res) => {
    let id = req.params.id;
    let descripcion = req.params.descripcion;

    models.Automovil.update(
        {
            descripcion: descripcion
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

    models.Automovil.destroy({
        where: {
            id: id
        }
    }).then(() => {
        res.sendStatus(200);
    })
});

module.exports = router;