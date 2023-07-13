const { response }      = require('express');
const User              = require('../models/user');
const UserDetail        = require('../models/userDetail');

const getUserDetail = async(req, res = response) => {
    const user = req.params.uid;

    try {
        const existUserDetail = await UserDetail.findOne({ user });
         if( !existUserDetail ) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe detalles para este usuario'
            });
         }

         res.json({
            ok: true,
            userDetail
         });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado... revisar logs'
        });
    }

};

const createUserDetail = async(req, res = response) => {
    const { ...fields } = req.body;

    try {

        const existUserDetail = await UserDetail.findOne({ user: fields.user });
        if( existUserDetail ) {
            return res.status(400).json({
                ok: false,
                msg: 'Ya existe detalles para este usuario'
            });
         }

         // Creacion
        fields.createdBy = req.uid;
        fields.createdUtc = new Date();

        const userDetail = new UserDetail(fields);
        await userDetail.save();

        res.json({
            ok: true,
            userDetail
        });

        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado... revisar logs'
        });
    }
};

const updateUserDetail = async(req, res = response) => {
    const _id = req.params.id;

    try {

        const userDetailDB = await UserDetail.findById( _id );

        if ( !userDetailDB ) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe detalles para el usuario con ese id'
            });
        }

        // Actualizacion
        const fields = req.body;
        fields.lastModifiedBy = req.uid;
        fields.lastModifiedUtc = new Date();

        const userDetailUpdated = await UserDetail.findByIdAndUpdate(_id, fields, { new: true });

        res.json({
            ok: true,
            userDetail: userDetailUpdated
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado... revisar logs'
        });
    }
};

const deleteUserDetail = async(req, res = response) => {
    const _id = req.params.id;

    try {

        const userDetailDB = await UserDetail.findById( _id );

        if ( !userDetailDB ) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe detalle de usuario con ese id'
            });
        }

        await UserDetail.findByIdAndDelete( _id );

        res.json({
            ok: true,
            msg: 'Detalle de usuario eliminado!!!'
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
    getUserDetail,
    createUserDetail,
    updateUserDetail,
    deleteUserDetail
};

