const express = require('express');
const router = express.Router();
const models = require('../models');

router.get('/', (req, res) => {
    console.log('llegue')
    models.Persona.findAll()
        .then((rows) => {
            res.send(rows);
        });
});

router.get('/:id', (req, res) => {
    let id = req.params.id;

    models.Persona.findOne({
        where: {
            id: id
        }
    })
    .then((row) => {
        res.send(row);
    });
});

router.post('/', (req, res) => {
    let nombreCompleto = req.body.nombreCompleto;
    let tipo = req.body.tipo;
    let sucursalId = req.body.sucursalId;

    models.Sucursal.findOne({
        where: {
            id: sucursalId
        }
    })
    .then((sucursal) => {
        console.log(sucursal)
        models.Persona.create({
            nombreCompleto: nombreCompleto,
            tipo: tipo,
            sucursal: sucursal
        }).then(() => {
            res.sendStatus(201);
        })
    })
});

router.put('/:id', (req, res) => {
    let id = req.params.id;
    let nombreCompleto = req.body.nombreCompleto;
    let tipo = req.body.tipo;
    
    models.Persona.update(
        {
            nombreCompleto: nombreCompleto,
            tipo: tipo,
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

    models.Persona.destroy({
        where: {
            id: id
        }
    }).then(() => {
        res.sendStatus(200);
    })
});

module.exports = router;