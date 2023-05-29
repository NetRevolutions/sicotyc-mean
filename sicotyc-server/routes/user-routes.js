/**
 * Ruta: /api/users
 */

const { Router } = require('express');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validate-fields');
const { getUsers, createUser, updateUser, deleteUser } = require('../controllers/user-controller');
const { validateJWT } = require('../middlewares/validate-jwt');

const router = Router();

router.get( '/',
    [
        validateJWT
    ],
    getUsers
);

router.post('/',
    [
        validateJWT,
        check('firstName', 'El nombre es obligatorio').not().isEmpty(),
        check('lastName', 'El apellido es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),        
        validateFields
    ], 
    createUser
);

router.put('/:id',
    [
        validateJWT,
        check('firstName', 'El nombre es obligatorio').not().isEmpty(),
        check('lastName', 'El apellido es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
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