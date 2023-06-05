/**
 * UserDetail
 * Path: '/api/userDetail'
 */

const { Router }          = require('express');
const { check }           = require('express-validator');
const { validateFields }  = require('../middlewares/validate-fields');
const { validateJWT }     = require('../middlewares/validate-jwt');
const {
    getUserDetail,
    createUserDetail,
    updateUserDetail,
    deleteUserDetail
}                         = require('../controllers/userDetail-controller');

const router = Router();

router.get(':/uid', validateJWT, getUserDetail);

router.post('', 
    [
        //validateJWT,
        check('user', 'El id de usuario es obligatorio').not().isEmpty(),
        check('dateOfBirth', 'La fecha de nacimiento es obligatorio').not().isEmpty(),
        check('typeOfDocument', 'El tipo de documento es requerido').not().isEmpty(),
        check('numberOfDocument', 'El nro de documento es requerido').not().isEmpty(),
        validateFields
    ], 
    createUserDetail
);

router.put('/:id', 
    [
        validateJWT,
        check('user', 'El id de usuario es obligatorio').not().isEmpty(),
        check('dateOfBirth', 'La fecha de nacimiento es obligatorio').not().isEmpty(),
        check('typeOfDocument', 'El tipo de documento es requerido').not().isEmpty(),
        check('numberOfDocument', 'El nro de documento es requerido').not().isEmpty(),
        validateFields
    ], 
    updateUserDetail
);

router.delete( '/:id',
    [
        validateJWT
    ],
    deleteUserDetail
);

module.exports = router;