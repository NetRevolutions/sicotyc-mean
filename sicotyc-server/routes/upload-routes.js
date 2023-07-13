/**
 * Search
 * Path: '/api/upload/'
 */

const { Router } = require('express');
const expressFileUpload = require('express-fileupload');

const { validateJWT } = require('../middlewares/validate-jwt');
const { fileUpload, returnImage } = require('../controllers/upload-controller');

const router = Router();

router.use( expressFileUpload() );


router.put('/:type/:id', validateJWT, fileUpload );

router.get('/:type/:photo', returnImage );


module.exports = router;

