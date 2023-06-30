/**
 * Ruta: /api/users
 */

const { Router } = require('express');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validate-fields');
const { getUser, getUsers, createUser, updateUser, deleteUser } = require('../controllers/user-controller');
const { validateJWT } = require('../middlewares/validate-jwt');

const router = Router();

router.get( '/user',
    [
        validateJWT
    ],
    getUser
);

router.get( '/',
    [
        validateJWT
    ],
    getUsers
);


router.post('/',
    [
        // validateJWT,
        check('firstName', 'El nombre es obligatorio').not().isEmpty(),
        check('lastName', 'El apellido es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        check('mobile', 'El nro de celular es obligatorio').not().isEmpty(),      
        validateFields
    ], 
    createUser
);

router.put('/:id',
    [
        validateJWT,
        check('firstName', 'El nombre es obligatorio').not().isEmpty(),
        check('lastName', 'El apellido es obligatorio').not().isEmpty(),
        check('userName', 'El nombre de usuario es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        check('mobile', 'El nro de celular es obligatorio').not().isEmpty(), 
        validateFields        
    ], 
    updateUser
);

router.delete('/:id',
    [    
        validateJWT    
    ], 
    deleteUser
);


module.exports = router;