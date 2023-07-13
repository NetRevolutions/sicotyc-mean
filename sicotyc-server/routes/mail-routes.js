/**
 * Ruta: /api/mail
 */

const { Router } = require('express');
const { validateJWT } = require('../middlewares/validate-jwt');
const { mailRegisterUser, mailConfirmWorkOrder } = require('../controllers/mail-controller')


const router = Router();

router.post('/registerUser', [], mailRegisterUser);

router.post('/workOrder', [], mailConfirmWorkOrder)


module.exports = router;