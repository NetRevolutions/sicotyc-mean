/**
 * Companies
 * Path: '/api/companies'
 */

const { Router }          = require('express');
const { check }           = require('express-validator');
const { validateFields }  = require('../middlewares/validate-fields');
const { validateJWT }     = require('../middlewares/validate-jwt');
const { 
    getCompanies,
    getCompanyByRuc,
    getCompany,
    createCompany,
    updateCompany,
    deleteCompany
}                         = require('../controllers/company-controller');

const router = Router();

router.get( '/',
    [
        //validateJWT
    ],
    getCompanies
);

router.get( '/ruc/:ruc',
    [
        //validateJWT
    ],
    getCompanyByRuc
);

router.get( '/:id',
    [
        //validateJWT
    ],
    getCompany
);

router.post( '',
    [
        //validateJWT,
        check('ruc', 'El nro de ruc es requerido').not().isEmpty(),
        check('nombreComercial', 'El nombre de la empresa es requerido').not().isEmpty(),
        check('companyEmail', 'El correo de la empresa es requerido').isEmail(),
        check('companyPhone', 'El telefono de contacto de la empresa es requerido').not().isEmpty(),
        check('typeOfCompany', 'El tipo de empresa es requerido').not().isEmpty(),
        validateFields
    ],    
    createCompany
);

router.put( '/:id',
    [
        validateJWT,
        check('ruc', 'El nro de ruc es requerido').not().isEmpty(),
        check('nombreComercial', 'El nombre de la empresa es requerido').not().isEmpty(),
        check('companyEmail', 'El correo de la empresa es requerido').isEmail(),
        check('companyPhone', 'El telefono de contacto de la empresa es requerido').not().isEmpty(),
        check('typeOfCompany', 'El tipo de empresa es requerido').not().isEmpty(),
        validateFields
    ],
    updateCompany
);

router.delete( '/:id',
    [
        validateJWT
    ],
    deleteCompany
);

module.exports = router;