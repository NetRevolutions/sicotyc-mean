/**
 * Ruta: /api/login
 */

const { Router } = require('express');
const { login} = require('../controllers/auth-controller');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validate-fields');

const router = Router();


router.post( '/',
    [
        check('email', 'El email es requerido').isEmail(),
        check('password', 'El password es requerido').not().isEmpty(),
        validateFields
    ],
    login
);


module.exports = router;