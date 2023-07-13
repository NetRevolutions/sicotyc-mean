/**
 * Drivers
 * Path: '/api/drivers'
 */

const { Router }          = require('express');
const { check }           = require('express-validator');
const { validateFields }  = require('../middlewares/validate-fields');
const { validateJWT }     = require('../middlewares/validate-jwt');
const {
    getDrivers,
    getDriverByLicNum,
    getDriver,
    createDriver,
    updateDriver,
    deleteDriver
} = require('../controllers/driver-controller');

const router = Router();

router.get( '/',
    [
        validateJWT
    ],
    getDrivers
);

router.get( '/licNum/:licNum',
    [
        validateJWT
    ],
    getDriverByLicNum
);

router.get( '/:id',
    [
        validateJWT
    ],
    getDriver
);

router.post( '',
    [
        validateJWT,
        check('firstName', 'El(los) nombre(s) es requerido').not().isEmpty(),
        check('lastName', 'El(los) apellido(s) es requerido').not().isEmpty(),
        check('typeOfDocument_id', 'El tipo de documento de identidad es requerido').not().isEmpty(),
        check('documentNumber', 'El nro de documento de identidad es requerido').not().isEmpty(),
        check('email', 'El correo del conductor es requerido').isEmail(),
        check('mobile', 'El celular del conductor es requerido').not().isEmpty(),
        check('licenseNumber', 'El nro de licencia es requerido').not().isEmpty(),
        check('typeOfLicense_id', 'El tipo de licencia es requerido').not().isEmpty(),
        check('expeditionDate', 'La fecha de expedicion de la licencia es requerido').not().isEmpty(),
        check('expireDate', 'La fecha de revalidacion de la licencia es requerida').not().isEmpty(),
        check('birthDate', 'La fecha de nacimiento del conductor es requerida').not().isEmpty(),
        validateFields
    ],
    createDriver
);

router.put( '/:id',
    [
        validateJWT,
        check('firstName', 'El(los) nombre(s) es requerido').not().isEmpty(),
        check('lastName', 'El(los) apellido(s) es requerido').not().isEmpty(),
        check('typeOfDocument_id', 'El tipo de documento de identidad es requerido').not().isEmpty(),
        check('documentNumber', 'El nro de documento de identidad es requerido').not().isEmpty(),
        check('email', 'El correo del conductor es requerido').isEmail(),
        check('mobile', 'El celular del conductor es requerido').not().isEmpty(),
        check('licenseNumber', 'El nro de licencia es requerido').not().isEmpty(),
        check('typeOfLicense_id', 'El tipo de licencia es requerido').not().isEmpty(),        
        check('expeditionDate', 'La fecha de expedicion de la licencia es requerido').not().isEmpty(),
        check('expireDate', 'La fecha de revalidacion de la licencia es requerida').not().isEmpty(),
        check('birthDate', 'La fecha de nacimiento del conductor es requerida').not().isEmpty(),
        validateFields
    ],
    updateDriver
);

router.delete( '/:id',
    [
        validateJWT
    ],
    deleteDriver
);

module.exports = router;