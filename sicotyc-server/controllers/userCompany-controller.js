const { response }      = require('express');
const User              = require('../models/user');
const Company           = require('../models/company');
const UserCompany       = require('../models/userCompany');

const createUserCompany = async(req, res = response) => {
    const { ...fields } = req.body;

    try {

        const existUserCompany = await UserCompany.findOne({ user: fields.user, company: fields.company });
        if ( existUserCompany ) {
            return res.status(404).json({
                ok: false,
                msg: 'La combinacion usuario-company existe'
            });
        }

        // Creacion
        fields.createdBy = req.uid;
        fields.createdUtc = new Date();

        const userCompany = new UserCompany( fields );
        await userCompany.save();

        res.json({
            ok: true,
            userCompany
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado... revisar logs'
        });
    }
};


const deleteUserCompany = async(req, res = response) => {
    const user = req.params.user_id;
    const company = req.params.company_id;

    try {

        const userDB = await User.findById( user );
        const companyDB = await Company.findById( company );

        await UserCompany.deleteOne({ user, company });

        res.json({
            ok: true,
            msg: `La relacion de la empresa con Ruc ${ companyDB.ruc} asociado al usuario ${userDB.firstName} ${userDB.lastName} fue eliminado!!!`
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado... revisar logs'
        });
    }
};

module.exports = {
    createUserCompany,    
    deleteUserCompany
}