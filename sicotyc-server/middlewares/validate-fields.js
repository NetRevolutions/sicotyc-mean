const { response } = require('express');
const { validationResult } = require('express-validator'); 

const validateFields = (req, res = response, next) => {
    const errors = validationResult( req ); // Con esto obtiene todos los errores definidos en el route que no pasaron en la ruta
    if ( !errors.isEmpty() ) {
        return res.status(400).json({
            ok: false,
            errors: errors.mapped()
        });
    }

    next();
}

module.exports = {
    validateFields
}
