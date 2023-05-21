const { response }  = require('express');
const LC            = require('../models/lookupCode');
const LCG           = require('../models/lookupCodeGroup');

const getLookupCodes = async(req, res = response) => {
    
    const lc = await LC.find({}).sort({ lookupCodeGroup_id: 1, lookupCodeOrder: 1});

    res.json({
        ok: true,
        lookupCodes: lc
    });
};

const getLookupCodesByLCG = async(req, res = response) => {
    const lcgId = req.params.lcgId;

    const lc = await LC.find({ lookupCodeGroup_id: lcgId}).sort({ lookupCodeGroup_id: 1, lookupCodeOrder: 1});

    res.json({
        ok: true,
        lookupCodes: lc
    });
};

const createLookupCodes = async(req, res = response) => {    
    const { lookupCodeGroup_id, lookupCodeValue, lookupCodeName, ...params } = req.body;

    try {

        const lcgDB = await LCG.findById( lookupCodeGroup_id );

        if ( !lcgDB ) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un Lookup Code Group con ese id'
            });
        }

        const existLC = await LC.findOne({lookupCodeGroup_id, lookupCodeValue, lookupCodeName});
        if ( existLC ) {
            return res.status(404).json({
                ok: false,
                msg: 'Lookup Code ya se encuentra registrado'
            });
        }
        
        // Obtenemos la cantidad de registros que existen con este lookupCodeGroupId en la colleccion LookupCodes
        let lcOrder = await LC.count({ lookupCodeGroup_id }, { limit: 1 });
        let lastLookupCodeOrder = 0;             
        if ( lcOrder > 0 ) {   
            
            // Filtramos por lookupCodeGroupId y traemos y ordenamos el lookupCodeOrder de manera descendente
            lcOrder = await LC.find({ lookupCodeGroup_id }, { lookupCodeOrder: 1, _id: 0 }).sort({lookupCodeOrder: -1});
            
            // Obtenemos el ultimo lookupCodeOrder y le sumamos 1          
            lastLookupCodeOrder = lcOrder[0].lookupCodeOrder;
            lastLookupCodeOrder++;
        }                    

        const lc = new LC(req.body);
        lc.lookupCodeOrder = lastLookupCodeOrder;
        await lc.save();

        res.json({
            ok: true,
            lookupCode: lc
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado... revisar logs'
        });
    }
};


const updateLookupCodes = async(req, res = response) => {
    const id = req.params.id;

    try {
        
        const lcDB = await LC.findById( id );

        if ( !lcDB ) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un Lookup Code con ese id'
            });
        }

        // Actualizacion
        const fields = req.body;

        const lcUpdated = await LC.findByIdAndUpdate( id, fields, { new : true} );

        res.json({
            ok: true,
            lookupCode: lcUpdated
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        });
    }
};

const deleteLookupCode = async( req, res = response ) => {
    const id = req.params.id;

    try {

        const lcDB = await LC.findById( id );

        if ( !lcDB ) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un Lookup Code por ese id'
            });
        }

        const lcgId = lcDB.lookupCodeGroup_id;

        // Elminacion
        await LC.findByIdAndDelete( id );

        
        // Busqueda de documentos con el mismo lookupCodeGroupId
        const lcs = await LC.find({ lookupCodeGroup_id : lcgId });

        // Reordenar los lookupCodeOrder en orden ascendente!!!
        lcs.sort((a,b) => a.lookupCodeOrder - b.lookupCodeOrder);
        let i = 0;
        lcs.forEach(async(doc, index) => {
            doc.lookupCodeOrder = i;//index + 1
            i++;
            await doc.save();
        }); 

        res.json({
            ok: true,
            msg: 'Lookup Code eliminado'
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
    getLookupCodes,
    getLookupCodesByLCG,
    createLookupCodes,
    updateLookupCodes,
    deleteLookupCode
}