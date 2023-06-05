/**
 * Ruta: /api/userCompany
 */

const { Router } = require('express');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validate-fields');
const { createUserCompany, deleteUserCompany } = require('../controllers/userCompany-controller');
const { validateJWT } = require('../middlewares/validate-jwt');

const router = Router();

router.post('/',
    [
        //validateJWT,
        check('user', 'El id de usuario es obligatorio').not().isEmpty(),
        check('company', 'El id de la empresa es obligatorio').not().isEmpty(),
        validateFields
    ], 
    createUserCompany
);

router.delete('/:user_id/:company_id', validateJWT, deleteUserCompany);

module.exports = router;