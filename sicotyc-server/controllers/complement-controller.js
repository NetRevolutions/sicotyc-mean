const { response }          = require('express');
const Complement            = require('../models/complement');
const WorkOrderComplement   = require('../models/workOrderComplement');

const getComplements = async(req, res = response) => {

    const complements = Complement.find();

    res.json({
        ok: true,
        complements
    });
};

const getComplement = async(req, res = response) => {

    const _id = req.params.id;

    try {

        const complement = await Complement.findById( _id );

        if ( !complement ) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe complemento con ese id'
            });
        }

        res.json({
            ok: true,
            complement
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado... revisar logs'
        });
    }
};

const getComplementByPlate = async(req, res = response) => {

    const plate = req.params.plate;

    try {

        const complement = await Complement.findOne({ plate });

        if ( !complement ) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un complemento con esa placa'
            });
        }

        res.json({
            ok: true,
            complement
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado... revisar logs'
        });
    }
};

const getComplementByMtc = async(req, res = response) => {

    const mtc = req.params.mtc;

    try {

        const complement = await Complement.findOne({ mtcNumber: mtc });

        if ( !complement ) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe complemento con ese nro de MTC'
            });
        }

        res.json({
            ok: true,
            complement
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado... revisar logs'
        });
    }
};

const createComplement = async(req, res = response) => {

    const { plate, mtcNumber, ...fields } = req.body;

    try {

        const existComplement = await Complement.findOne({ plate });

        if ( existComplement ) {
            return res.status(404).json({
                ok: false,
                msg: 'El complemento con la placa ' + plate + ' y MTC ' + mtcNumber + ' ya se encuentra registrado.'
            });
        }

        const complement = new Complement(fields);
        await complement.save();

        res.json({
            ok: true,
            complement
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado... revisar logs'
        });
    }
};

const updateComplement = async(req, res = response) => {

    const _id = req.params.id;

    try {

        const complementDB = await Complement.findById( _id );

        if ( !complementDB ) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe complemento con ese id'
            });
        }

        // Actualizacion
        const fields = req.body;

        const complementUpdated = await Complement.findByIdAndUpdate( _id, fields, { new: true });

        res.json({
            ok: true,
            complement: complementUpdated
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado... revisar logs'
        });
    }
};

const deleteComplement = async(req, res = response) => {

    const _id = req.params.id;

    try {

        const complementDB = await Complement.findById( _id );

        if ( !complementDB ) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un complemento con ese id'
            });
        }

        // Validamos si es usado por WorkOrderComplement
        const workOrderComplementDB = await WorkOrderComplement.findOne({ complement_id : complementDB._id });

        if ( workOrderComplementDB ) {
            return res.status(404).json({
                ok: false,
                msg: 'Complemento no puede ser eliminado porque esta asociado a una Orden de Trabajo'
            });
        }

        await Complement.findByIdAndDelete( _id );

        res.json({
            ok: true,
            msg: 'Complemento eliminado!!!'
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
    getComplements,
    getComplement,
    getComplementByPlate,
    getComplementByMtc,
    createComplement,
    updateComplement,
    deleteComplement
};