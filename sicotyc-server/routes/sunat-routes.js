/**
 * Sunat
 * Path: '/api/sunat'
 */

const { Router } = require('express');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validate-fields');
const { getSunatData } = require('../controllers/sunat-controller')

const router = Router();

router.get('/:ruc', 
    [

    ],
    getSunatData
);

module.exports = router;