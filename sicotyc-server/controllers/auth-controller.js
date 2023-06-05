const { response }      = require('express');
const bcrypt            = require('bcryptjs');
const User              = require('../models/user');
const UserRole          = require('../models/userRole');
const { generateJWT }   = require('../helpers/jwt');

const login = async(req, res = response) => {

    const { email, password } = req.body;

    try {

        // Verficar Email        
        const userDB = await User.findOne({ email });
        
        if ( !userDB ) {
            return res.status(404).json({
                ok: false,
                msg: 'Contraseña o Email no encontrado'
            });
        };

        // Verificar Contraseña
        const validPassword = bcrypt.compareSync( password, userDB.password );
        if ( !validPassword ) {
            return res.status(400).json({
                ok: false,
                msg: 'Contraseña o Email no encontrado'
            });
        };

        // Obtener Roles por Usuario (buscar en el documento UserRole)
        const userRolesDB = await UserRole.find({ user_id : userDB.id });
        const roles = [];
        if (userRolesDB && userRolesDB.length > 0) {
            userRolesDB.forEach(element => {
                roles.push(element.role_id);
            });
        }
                
        // Obtener opciones por Usuario (a futuro)        

        // Generar el TOKEN -JWT
        const token = await generateJWT( userDB.id, JSON.stringify(roles) );

        res.json({
            ok: true,
            token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado... revisar logs'
        });
    }
};

const renewToken = async ( req, res = response ) => {

    const uid = req.uid;

    // Obtener Roles por Usuario (buscar en el documento UserRole)
    const userRolesDB = await UserRole.find({ user_id : uid });
    const roles = [];
    if (userRolesDB && userRolesDB.length > 0) {
        userRolesDB.forEach(element => {
            roles.push(element.role_id);
        });
    }
    
    // Generar el TOKEN -JWT
    const token = await generateJWT( uid, JSON.stringify(roles) );
    
    res.json({
        ok: true,
        token
    });
};


module.exports = {
    login,
    renewToken
};