/**
 * Ruta: /api/roles
 */

const { Router } = require('express');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validate-fields');

const { 
    getRoles, 
    createRole, 
    updateRole, 
    deleteRole 
} = require('../controllers/role-controller');

const { validateJWT } = require('../middlewares/validate-jwt');

const router = Router();

router.get( '/', 
    [
        // validateJWT
    ], 
    getRoles 
);

router.post('/', 
    [
        // Aca ponemos la lista de middlewares que necesitaremos:        
        check('roleName', 'El nombre del role es obligatorio').not().isEmpty(),
        validateFields // Siempre se pone al final (middleware personalizado)

    ], 
    createRole
);

router.put('/:id',
    [
        validateJWT,
        check('roleName', 'El nombre del role es obligatorio').not().isEmpty(),
        validateFields
    ],
    updateRole
);

router.delete('/:id',
    [
        validateJWT,
    ],
    deleteRole
);

module.exports = router;