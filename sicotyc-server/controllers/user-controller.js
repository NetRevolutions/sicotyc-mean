const { response }      = require('express');
const bcrypt            = require('bcryptjs');
const User              = require('../models/user');
const Role              = require('../models/role');
const UserRole          = require('../models/userRole');
const { generateJWT }   = require('../helpers/jwt');

const getUsers = async(req, res) => {

    const users = await User.find({}, 'firstName lastName userName email role_id')    

    res.json({
        ok: true,
        users,
        uid: req.uid
    });
};

const createUser = async(req, res = response) => {

    const { email, password, role_id } = req.body;

    try {
        
        const existEmail = await User.findOne({ email });
        if ( existEmail ) {
            return res.status(400).json({
                ok: false,
                msg: 'El correo ya esta registrado'
            });
        }

        const user = new User( req.body );

        // Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync( password, salt );         
        
        if (!user.role_id) {
            // Asignar Role por defecto (Coordinador):
            let role = await Role.findOne({roleName: 'Coordinador'});            
            user.role_id = role._id;
        }        
        
        //user.role_id = '6450800d41785afe9e588ac6'; // Role: 'Transportista'

        // Guardar usuario
        await user.save();        

        // Guardamos en la table UserRole
        const userRole = new UserRole({
            user_id: user.id,
            role_id: user.role_id
        });
        // userRole.user_id = user.id;
        // userRole.role_id = user.role_id;
        await userRole.save();

        const roles = [role_id]
        // Generar el TOKEN - JWT
        const token = await generateJWT( user.id, JSON.stringify(roles));

        res.json({
            ok: true,
            user,
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


const updateUser = async(req, res = response) => {

    // TODO: Validar token y comprobar si es el usuario correcto

    const uid = req.params.id;

    try {
        const userDB = await User.findById( uid );

        if (!userDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un usuario por ese id'
            });
        }

        // Actualizaciones
        const { password, email, ...fields } = req.body;

        if ( userDB.email !== email ) {
            const existEmail = await User.findOne({ email });
            if (existEmail ) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Ya existe un usuario con ese email'
                });
            }
        }

        fields.email = email;
        const userUpdated = await User.findByIdAndUpdate( uid, fields, { new: true });

        res.json({
            ok: true,
            user: userUpdated
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado... revisar logs'
        });
    }
};

const deleteUser = async(req, res = response ) => {
    
    const uid = req.params.id;

    try {

        const userDB = await User.findById( uid );

        if (!userDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un usuario por ese id'
            });
        }

        // Si queremos hacer una eliminacion logica lo cambiamos por findByIdAndUpdate y pasamos un parametro delete en true
        await User.findByIdAndDelete( uid );

        res.json({
            ok: true,
            msg: 'Usuario eliminado'
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado... revisar logs'
        });
    }
};

module.exports = {
    getUsers,
    createUser,
    updateUser,
    deleteUser
};