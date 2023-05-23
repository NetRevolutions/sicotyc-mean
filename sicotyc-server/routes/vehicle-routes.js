/**
 * Vehicles
 * Path: '/api/vehicles'
 */

const { Router }          = require('express');
const { check }           = require('express-validator');
const { validateFields }  = require('../middlewares/validate-fields');
const { validateJWT }     = require('../middlewares/validate-jwt');
const {
    getVehicles,
    getVehicle,
    getVehicleByPlate,
    getVehicleByMtc,
    createVehicle,
    updateVehicle,
    deleteVehicle
} = require('../controllers/vehicle-controller');

const router = Router();

router.get( '/',
    [
        validateJWT
    ],
    getVehicles    
);

router.get( '/:id',
    [
        validateJWT
    ],
    getVehicle
);

router.get( '/plate/:plate',
    [
        validateJWT
    ],
    getVehicleByPlate
);

router.get( '/mtc/:mtc',
    [
        validateJWT
    ],
    getVehicleByMtc
);

router.post( '',
    [
        validateJWT,
        check('plate', 'El nro de placa es requerido').not().isEmpty(),
        check('mtcNumber', 'El nro de MTC es requerido').not().isEmpty(),
        check('mtcStartDate', 'La fecha de inicio es requerido').not().isEmpty(),
        check('mtcEndData', 'La fecha de revalidacion es requerida').not().isEmpty(),
        check('axis', 'Nro de ejes es requerido').not().isEmpty(),
        check('company_id', 'La empresa a la que pertenece el vehiculo es requerido').not().isEmpty(),
        check('fabricationYear', 'El año de fabricacion es requerido').not().isEmpty(),
        check('color_id', 'El color del vehiculo es requerido').not().isEmpty(),
        validateFields
    ],
    createVehicle
);

router.put( '/:id',
    [
        validateJWT,
        check('plate', 'El nro de placa es requerido').not().isEmpty(),
        check('mtcNumber', 'El nro de MTC es requerido').not().isEmpty(),
        check('mtcStartDate', 'La fecha de inicio es requerido').not().isEmpty(),
        check('mtcEndData', 'La fecha de revalidacion es requerida').not().isEmpty(),
        check('axis', 'Nro de ejes es requerido').not().isEmpty(),
        check('company_id', 'La empresa a la que pertenece el vehiculo es requerido').not().isEmpty(),
        check('fabricationYear', 'El año de fabricacion es requerido').not().isEmpty(),
        check('color_id', 'El color del vehiculo es requerido').not().isEmpty(),
        validateFields
    ],
    updateVehicle
);

router.delete( '/:id',
    [
        validateJWT
    ],
    deleteVehicle
);

module.exports = router;