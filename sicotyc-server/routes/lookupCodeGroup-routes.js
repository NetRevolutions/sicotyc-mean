/**
 * Lookup Code Groups
 * Path: '/api/lookupCodeGroups'
 */

const { Router } = require('express');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validate-fields');
const { validateJWT } = require('../middlewares/validate-jwt');
const { 
    getLookupCodeGroups, 
    createLookupCodeGroups, 
    updateLookupCodeGroups, 
    deleteLookupCodeGroup 
} = require('../controllers/lookupCodeGroup-controller');


const router = Router();

router.get( '/',
    [
        validateJWT
    ],
    getLookupCodeGroups
);

router.post('/',
    [
        validateJWT,
        check('lookupCodeGroupName', 'El nombre del Lookup Code Group es requerido').not().isEmpty(),
        validateFields
    ], 
    createLookupCodeGroups
);

router.put('/:id',
    [
        validateJWT,
        check('lookupCodeGroupName', 'El nombre del Lookup Code Group es requerido').not().isEmpty(),
        validateFields
    ], 
    updateLookupCodeGroups
);

router.delete('/:id',
    [    
        validateJWT    
    ], 
    deleteLookupCodeGroup
);


module.exports = router;