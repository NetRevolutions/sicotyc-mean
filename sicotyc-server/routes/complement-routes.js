/**
 * Complements
 * Path: '/api/complements'
 */

const { Router }          = require('express');
const { check }           = require('express-validator');
const { validateFields }  = require('../middlewares/validate-fields');
const { validateJWT }     = require('../middlewares/validate-jwt');
const {
    getComplements,
    getComplement,
    getComplementByPlate,
    getComplementByMtc,
    createComplement,
    updateComplement,
    deleteComplement
}                         = require('../controllers/complement-controller');

const router = Router();

router.get( '/',
    [
        validateJWT
    ],
    getComplements    
);

router.get( '/:id',
    [
        validateJWT
    ],
    getComplement
);

router.get( '/plate/:plate',
    [
        validateJWT
    ],
    getComplementByPlate
);

router.get( '/mtc/:mtc',
    [
        validateJWT
    ],
    getComplementByMtc
);

router.post( '',
    [
        validateJWT,
        check('plate', 'El nro de placa es requerido').not().isEmpty(),
        check('mtcNumber', 'El nro de MTC es requerido').not().isEmpty(),
        check('mtcStartDate', 'La fecha de inicio es requerido').not().isEmpty(),
        check('mtcEndData', 'La fecha de revalidacion es requerida').not().isEmpty(),
        check('axis', 'Nro de ejes es requerido').not().isEmpty(),
        check('company', 'La empresa a la que pertenece el complemento es requerido').not().isEmpty(),
        check('fabricationYear', 'El año de fabricacion es requerido').not().isEmpty(),
        check('color_id', 'El color del complemento es requerido').not().isEmpty(),
        validateFields
    ],
    createComplement
);

router.put( '/:id',
    [
        validateJWT,
        check('plate', 'El nro de placa es requerido').not().isEmpty(),
        check('mtcNumber', 'El nro de MTC es requerido').not().isEmpty(),
        check('mtcStartDate', 'La fecha de inicio es requerido').not().isEmpty(),
        check('mtcEndData', 'La fecha de revalidacion es requerida').not().isEmpty(),
        check('axis', 'Nro de ejes es requerido').not().isEmpty(),
        check('company', 'La empresa a la que pertenece el complemento es requerido').not().isEmpty(),
        check('fabricationYear', 'El año de fabricacion es requerido').not().isEmpty(),
        check('color_id', 'El color del complemento es requerido').not().isEmpty(),
        validateFields
    ],
    updateComplement
);

router.delete( '/:id',
    [
        validateJWT
    ],
    deleteComplement
);

module.exports = router;