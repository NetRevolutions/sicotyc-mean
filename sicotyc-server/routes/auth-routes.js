/**
 * Ruta: /api/login
 */

const { Router } = require('express');
const { login, renewToken } = require('../controllers/auth-controller');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validate-fields');
const { validateJWT } = require('../middlewares/validate-jwt');

const router = Router();


router.post( '/',
    [
        check('email', 'El email es requerido').isEmail(),
        check('password', 'El password es requerido').not().isEmpty(),
        validateFields
    ],
    login
);

router.get( '/renew', validateJWT, renewToken );


module.exports = router;