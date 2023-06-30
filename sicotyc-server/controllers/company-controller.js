const { response }  = require('express');
const Company       = require('../models/company');
const Complement    = require('../models/complement');
const UserCompany   = require('../models/userCompany');
const Vehicle       = require('../models/vehicle');

const getCompanies = async(req, res = response) => {

    const companies = await Company.find();

    res.json({
        ok: true,
        companies
    });
};

const getCompanyByRuc = async(req, res = response) => {
    const ruc = req.params.ruc;

    try {
        // TODO: peding helper to validate RUC   

        const company = await Company.findOne({ ruc });        

        if (company) {
            res.json({
                ok: true,
                company
            });
        } 
        else {
            res.json({
                ok: false,
                msg: 'No existe empresa con ese nro de RUC'
            })
        }
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado... revisar logs'
        });
    }    
};

const getCompany = async(req, res = response) => {
    const _id = req.params.id;

    try {           

        const company = await Company.findById( _id );

        if (!company) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe empresa con ese id'
            });
        } 

        res.json({
            ok: true,
            company
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado... revisar logs'
        });
    }    
};

const createCompany = async(req, res = response) => {

    const { ...fields } = req.body;   

    try {

        const existCompany = await Company.findOne({ ruc: fields.ruc });

        if ( existCompany ) {
            return res.status(400).json({
                ok: false,
                msg: 'La empresa' + fields.nombreComercial + 'ruc: ' + fields.ruc + ' ya se encuentra registrada'
            });
        }

        // Creacion
        fields.createdBy = req.uid;
        fields.createdUtc = new Date();

        const company = new Company( fields );
        await company.save();

        res.json({
            ok: true,
            company
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado... revisar logs'
        });
    }
};

const updateCompany = async(req, res = response) => {
    const _id = req.params.id;

    try {

        const companyDB = await Company.findById( _id );

        if ( !companyDB ) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe empresa con ese id'
            });
        }

        // Actualizacion
        const fields = req.body;
        fields.lastModifiedBy = req.uid;
        fields.lastModifiedUtc = new Date();

        const companyUpdated = await Company.findByIdAndUpdate( _id, fields, { new: true });

        res.json({
            ok: true,
            company: companyUpdated
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado... revisar logs'
        });
    }
};

const deleteCompany = async(req, res = response) => {
    const _id = req.params.id;

    try {

        const companyDB = await Company.findById( _id );
        
        if ( !companyDB ) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe una empresa con ese id'
            });
        }

        // Validamos si es usado en complement
        const complementDB = await Complement.findOne({ company: companyDB._id });
        
        if ( complementDB ) {
            return res.status(404).json({
                ok: false,
                msg: 'Company no puede ser eliminado porque esta siendo usado por un complemento.'
            });
        }

        // Validamos si es usado en User Company
        const userCompanyDB = await UserCompany.findOne({ company: companyDB._id });
        if ( userCompanyDB ) {
            return res.status(404).json({
                ok: false,
                msg: 'Company no puede ser eliminado porque esta siendo usado por un usuario.'
            });
        }

        // Validamos si es usado en Vehicle
        const vehicleDB = await Vehicle.findOne({ company: companyDB._id });
        if ( vehicleDB ) {
            return res.status(404).json({
                ok: false,
                msg: 'Company no puede ser elimiando porque esta siendo usado en un vehiculo'
            });
        }

        await Company.findByIdAndDelete( _id );

        res.json({
            ok: true,
            msg: 'Empresa eliminada!!!'
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
    getCompanies,
    getCompanyByRuc,
    getCompany,
    createCompany,
    updateCompany,
    deleteCompany
}