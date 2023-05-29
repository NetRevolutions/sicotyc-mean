const { response } = require('express');
const jwt = require('jsonwebtoken');

const validateJWT = (req, res = response, next) => {
    // Leer el token
    const token = req.header('x-token');
    
    if ( !token ) {
        return res.status(401).json({
            ok: false,
            msg: 'No hay token en la peticion'
        });
    }

    try {

        // Aca ponemos todos los objectos de queremos recuperar del token
        const { uid, roles } = jwt.verify( token, process.env.JWT_SECRET );

        req.uid = uid;
        req.roles = roles;
        
        next();
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Token no valido'
        });
    }    
};

module.exports = {
    validateJWT
}