const { response } = require('express');
const LCG = require('../models/lookupCodeGroup');
const LC = require('../models/lookupCode');

const getLookupCodeGroups = async(req, res = response) => {

    const lcg = await LCG.find();
    
    res.json({
        ok: true,
        lookupCodeGroups: lcg
    });
};

const createLookupCodeGroups = async(req, res = response) => {

    const { lookupCodeGroupName } = req.body;

    try {

        const existLCG = await LCG.findOne({ lookupCodeGroupName });

        if (existLCG) {
            return res.status(400).json({
                ok: false,
                msg: 'El nombre ' + lookupCodeGroupName + ' ya se encuentra registrado'
            });
        }

        const lcg = new LCG( req.body );
        await lcg.save();

        res.json({
            ok: true,
            lookupCodeGroup: lcg
        });
        
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado... revisar logs'
        });
    }    
};

const updateLookupCodeGroups = async(req, res = response) => {
    const id = req.params.id;

    try {
        
        const lcgDB = await LCG.findById( id );

        if ( !lcgDB ) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un Lookup Code Group con ese id'
            });
        }

        // Actualizacion
        const fields = req.body;

        const lcgUpdated = await LCG.findByIdAndUpdate( id, fields, { new: true} );

        res.json({
            ok: true,
            lookupCodeGroup: lcgUpdated
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        });
    }    
};


const deleteLookupCodeGroup = async(req, res = response) => {
    const id = req.params.id;

    try {
        const lcgDB = await LCG.findById( id );

        if ( !lcgDB ) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un Lookup Code Group por ese id'
            });
        }

        // Validar si existe algun Lookup Code asociado al Lookup Code Group
        const existLCGInLC = await LC.findOne({ lookupCodeGroup_id: id });
        
        if ( existLCGInLC ) {
            return res.status(404).json({
                ok: false,
                msg: 'No se puede eliminar el id: ' + id + ' porque tiene Lookup Codes asociados'
            });
        }

        await LCG.findByIdAndDelete( id );

        res.json({
            ok: true,
            msg: 'Lookup Code Group eliminado'
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        });
    }    
};

module.exports = {
    getLookupCodeGroups,
    createLookupCodeGroups,
    updateLookupCodeGroups,
    deleteLookupCodeGroup
}