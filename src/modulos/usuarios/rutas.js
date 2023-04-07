const express = require('express');
const respuesta = require('../../red/respuestas')
const controlador = require('./controlador')


const router = express.Router();

router.get('/', todos);
router.get('/:id', uno);
router.post('/', agregar);
router.put('/', eliminar);
router.post('/login',login);
router.post('/auth',verificacion);

async function login(req, res, next){
    try {
        const token = await controlador.login(req.body);
        respuesta.success(req, res, token, 200);
    } catch (error) {
        next(error);
    }
}

async function verificacion(req ,res, next){
    try {
        await controlador.verificacion(req);
        if(!req.decoded){
            respuesta.success(req, res, "No autorizado", 401);
        }else{
            respuesta.success(req, res, "Autorizado", 200);
        }
    } catch (error) {
        next(error);
    }
}

async function todos(req, res, next) {

    try {
        const items = await controlador.todos();
        respuesta.success(req, res, items, 200);
    } catch (error) {
        next(error);
    }
};

async function uno(req, res, next) {
    try {
        const items = await controlador.uno(req.params.id);
        respuesta.success(req, res, items, 200);
    } catch (error) {
        next(error);

    }
};

async function agregar(req, res, next) {
    try {
        const items = await controlador.agregar(req.body);
        console.log(items)
        if (req.body.idEmpleados == 0) {
            mensaje = items.insertId;
        } else {
            mensaje = 'Item actualizado con exito';
        }

        respuesta.success(req, res, mensaje, 201);
    } catch (error) {
        next(error);
    }
};

async function eliminar(req, res, next) {
    try {
        const items = await controlador.eliminar(req.body);
        respuesta.success(req, res, 'Item eliminado', 200);
    } catch (error) {
        next(error);
    }
};
module.exports = router;