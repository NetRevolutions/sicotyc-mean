const { response }      = require('express');
const bcrypt            = require('bcryptjs');
const User              = require('../models/user');
const Role              = require('../models/role');
const UserRole          = require('../models/userRole');
const { generateJWT }   = require('../helpers/jwt');

const getUsers = async(req, res = response) => {

    const users = await User.find({}, 'firstName lastName userName email imagePath')    

    res.json({
        ok: true,
        users,
        uid: req.uid
    });
};

const getUser = async(req, res = response) => {
     
    const user = await User.findById({ _id: req.uid });

    res.json({
        ok: true,
        user,
        uid: req.uid
    });
};

const createUser = async(req, res = response) => {

    const { ...fields } = req.body;  

    try { 
        const existEmail = await User.findOne({ email: fields.email });
        if ( existEmail ) {
            return res.status(400).json({
                ok: false,
                msg: 'El correo ya esta registrado'
            });
        }

        const existUserName = await User.findOne({ userName: fields.userName });
        if ( existUserName ) {
            return res.status(400).json({
                ok: false,
                msg: 'El nombre de usuario ya se encuentra registrado'
            });
        }

        // Creacion
        fields.createdBy = req.uid;
        fields.createdUtc = new Date();

        // Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        fields.password = bcrypt.hashSync( fields.password, salt );

        const user = new User( fields );   
            
        await user.save();

        //console.log('user', user);      

        // Asignar Role por defecto (Coordinador):
        let role = await Role.findOne({roleName: 'Coordinador'});
        
        //user.role_id = '6450800d41785afe9e588ac6'; // Role: 'Transportista'

        // Guardamos en la table UserRole
        const userRole = new UserRole({
            user: user.id,
            role: role._id,
            createdBy: req.uid,
            createdUtc: new Date()
        });
        
        await userRole.save();  
        
        const roles = [];
        roles.push(role._id);

        //console.log('user', user);

        // Generar el TOKEN - JWT
        const token = await generateJWT( user._id, roles); 
        // Evaluar si enviamos el uid y roles del usuario creado o mantenemos el actual

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
        const { ...fields } = req.body;

        if ( userDB.email !== fields.email ) {
            const existEmail = await User.findOne({ email: fields.email });
            if ( existEmail ) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Ya existe un usuario con ese email'
                });
            }
        }

        if ( userDB.userName !== fields.userName ) {
            const existUserName = await User.findOne({ userName: fields.userName });
            if ( existUserName ) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Nombre de usuario ya existe'
                })
            }
        }

        // Actualizacion        
        fields.lastModifiedBy = req.uid;
        fields.lastModifiedUtc = new Date();

        //fields.email = email;
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
    getUser,
    getUsers,
    createUser,
    updateUser,
    deleteUser
};