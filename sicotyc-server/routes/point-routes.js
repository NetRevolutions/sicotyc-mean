/**
 * Points
 * Path: '/api/points'
 */

const { Router }          = require('express');
const { check }           = require('express-validator');
const { validateFields }  = require('../middlewares/validate-fields');
const { validateJWT }     = require('../middlewares/validate-jwt');
const {
    getPoints,
    getPoint,
    getPointByName,
    createPoint,
    updatePoint,
    deletePoint
} = require('../controllers/point-controller');

const router = Router();

router.get( '/',
    [
        validateJWT
    ],
    getPoints
);

router.get( '/:id',
    [
        validateJWT
    ],
    getPoint
);

router.get( '/pointName/:pointName',
    [
        validateJWT
    ],
    getPointByName
);

router.post( '',
    [
        validateJWT,
        check('pointName', 'El nombre del almacen y/o lugar es requerido').not().isEmpty(),
        check('pointAliasName', 'El alias del almacen y/o lugar es requerido').not().isEmpty(),
        check('pointType', 'El tipo de punto es requerido').not().isEmpty(),        
        validateFields
    ],    
    createPoint
);

router.put( '/:id',
    [
        validateJWT,
        check('pointName', 'El nombre del almacen y/o lugar es requerido').not().isEmpty(),
        check('pointAliasName', 'El alias del almacen y/o lugar es requerido').not().isEmpty(),
        check('pointType', 'El tipo de punto es requerido').not().isEmpty(),    
        validateFields
    ],
    updatePoint
);

router.delete( '/:id',
    [
        validateJWT
    ],
    deletePoint
);

module.exports = router;