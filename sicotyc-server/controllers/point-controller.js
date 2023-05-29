const { response }  = require('express');
const Point = require('../models/point');
const RequestService = require('../models/requestService');

const getPoints = async(req, res = response) => {

    const points = await Point.find();

    res.json({
        ok: true,
        points
    });
};

const getPoint = async(req, res = response) => {
    const _id = req.params.id;
    try {
        
        const point = await Point.findById( _id );

        if (!point ) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe point con ese id'
            });
        }

        res.json({
            ok: true,
            point
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado... revisar logs'
        });
    }
};

const getPointByName = async(req, res = response) => {
    const pointName = req.params.pointName;
    try {
        
        const point = await Point.findOne({ pointName });

        if (!point ) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe point con ese nombre'
            });
        }

        res.json({
            ok: true,
            point
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado... revisar logs'
        });
    }
};

const createPoint = async(req, res = response) => {

    const { pointName, pointAliasName, ...fields } = req.body;

    try {

        const existPoint = await Point.findOne({ pointName, pointAliasName });

        if ( existPoint ) {
            return res.status(404).json({
                ok: false,
                msg: 'El punto con el nombre ' + pointName + ' y alias ' + pointAliasName + ' ya se encuentra registrado'
            });
        }

        // Creacion
        fields.createdBy = req.uid;
        fields.createdUtc = new Date();

        const point = new Point( fields );
        await point.save();

        res.json({
            ok: true,
            point
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado... revisar logs'
        });
    }
};

const updatePoint = async(req, res = response) => {
    const _id = req.params.id;

    try {

        const pointDB = await Point.findById( _id );

        if ( !pointDB ) {
            return res.status(404).json({
                ok: false,
                msg: 'no existe punto con ese id'
            });
        }

        // Actualizacion
        const fields = req.body;
        fields.lastModifiedBy = req.uid;
        fields.lastModifiedUtc = new Date();

        const pointUpdated = await Point.findByIdAndUpdate( _id, fields, { new: true });

        res.json({
            ok: true,
            point: pointUpdated
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado... revisar logs'
        });
    }

};

const deletePoint = async(req, res = response) => {
    const _id = req.params.id;

    try {

        const pointDB = await Point.findById( _id );

        if ( !pointDB ) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe punto con ese id'
            });
        }
        
        // Validamos si es usado en RequestService (PointOne)
        const requestServiceDB = await RequestService.findOne({ pointOne_id: pointDB._id });
        if ( requestServiceDB ) {
            return res.status(404).json({
                ok: false,
                msg: 'Point no puede ser eliminado porque esta siendo usado en una solicitud de servicio (PointOne)'
            });
        }

        // Validamos si es usado en RequestService (PointTwo)
        requestServiceDB = await RequestService.findOne({ pointTwo_id: pointDB._id });
        if ( requestServiceDB ) {
            return res.status(404).json({
                ok: false,
                msg: 'Point no puede ser eliminado porque esta siendo usado en una solicitud de servicio (PointTwo)'
            });
        }

        // Validamos si es usado en RequestService (PointThree)
        requestServiceDB = await RequestService.findOne({ pointThree_id: pointDB._id });
        if ( requestServiceDB ) {
            return res.status(404).json({
                ok: false,
                msg: 'Point no puede ser eliminado porque esta siendo usado en una solicitud de servicio (PointThree)'
            });
        }

        await Point.findByIdAndDelete( _id );

        res.json({
            ok: true,
            msg: 'Point eliminado!!!'
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
    getPoints,
    getPoint,
    getPointByName,
    createPoint,
    updatePoint,
    deletePoint
};