/**
 * Ruta: /api/userRoles
 */

const { Router } = require('express');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validate-fields');
const { createUserRole, deleteAllUserRole, deleteUserRole } = require('../controllers/userRole-controller');
const { validateJWT } = require('../middlewares/validate-jwt');

const router = Router();

router.post('/',
    [
        validateJWT,
        check('user', 'El id de usuario es obligatorio').not().isEmpty(),
        check('role', 'El id del role es obligatorio').not().isEmpty(),
        validateFields
    ],
    createUserRole
);

router.delete('/:user_id', validateJWT, deleteAllUserRole);

router.delete('/:user_id/:role_id', validateJWT, deleteUserRole);

module.exports = router;