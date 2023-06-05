const { response }      = require('express');
const User              = require('../models/user');
const Role              = require('../models/role');
const UserRole          = require('../models/userRole');

const createUserRole = async(req, res= response) => {
    const { ...fields } = req.body;

    try {
        const existUserRole = await UserRole.findOne({ user: fields.user, role: fields.role });
        if ( existUserRole ) {
            return res.status(404).json({
                ok: false,
                msg: 'La combinacion usuario-role ya existe'
            });
        }

        // Creacion
        fields.createdBy = req.uid;
        fields.createdUtc = new Date();

        const userRole = new UserRole( fields );
        await userRole.save();

        res.json({
            ok: true,
            userRole
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado... revisar logs'
        });
    }
};

const deleteAllUserRole = async(req, res = response) => {
    const user_id = req.params.user_id;

    try {
        
        const userDB = await User.findById( user_id );

        await UserRole.findByIdAndDelete( user_id );

        res.json({
            ok: true,
            msg: `Los roles para el usuario ${userDB.firstName} ${userDB.lastName} fueron eliminados!!!`
        });

        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado... revisar logs'
        });
    }
}

const deleteUserRole = async(req, res = response) => {
    const user = req.params.user_id;
    const role = req.params.role_id;

    try {
        
        const userDB = await User.findById( user );

        const roleDB = await Role.findById( role );

        await UserRole.deleteOne({ user, role });

        res.json({
            ok: true,
            msg: `El rol ${roleDB.roleName}  para el usuario ${userDB.firstName} ${userDB.lastName} fue eliminado!!!`
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado... revisar logs'
        });
    }
}

module.exports = {
    createUserRole,
    deleteAllUserRole,
    deleteUserRole
}