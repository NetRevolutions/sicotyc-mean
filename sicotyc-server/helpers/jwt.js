/**
 * Aca un buen ejemplo de implementacion de promesas:
 * https://es.javascript.info/promise-basics
 */

const jwt = require('jsonwebtoken');

const generateJWT = ( uid, roles ) => {

    return new Promise( ( resolve, reject ) => {
        const payload = {
            uid,
            roles

            // TODO: Pendiente de agregar mas informacion que no sea sensible
        };
    
    
        jwt.sign( payload, process.env.JWT_SECRET, {
            expiresIn: '12h'
        }, ( err, token ) => {
    
            if ( err ) {
                console.log(err);
                reject( 'No se pudo generar el JWT' );
            } else {
               resolve( token ); 
            }
    
        });
    });  
    
}

module.exports = {
    generateJWT
}