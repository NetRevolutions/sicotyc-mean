const { response }        = require('express');
const Vehicle             = require('../models/vehicle');
const WorkOrderVehicle    = require('../models/workOrderVehicle');


const getVehicles = async(req, res = response) => {

    const vehicles = await Vehicles.find();

    res.json({
        ok: true,
        vehicles
    });

};

const getVehicle = async(req, res = response) => {

    const _id = req.params.id;

    try {

        const vehicle = await Vehicle.findById( _id );

        if ( !vehicle ) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe vehiculo con ese id'
            });
        }

        res.json({
            ok: true,
            vehicle
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado... revisar logs'
        });
    }
};

const getVehicleByPlate = async(req, res = response) => {
    const plate = req.params.plate;

    try {

        const vehicle = await Vehicle.findOne({ plate });

        if ( !vehicle ) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe vehiculo con esa placa'
            });
        }

        res.json({
            ok: true,
            vehicle
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado... revisar logs'
        });
    }
};

const getVehicleByMtc = async(req, res = response) => {
    const mtc = req.params.mtc;

    try {

        const vehicle = await Vehicle.findOne({ mtcNumber: mtc });

        if ( !vehicle ) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe vehiculo con ese nro de MTC'
            });
        }

        res.json({
            ok: true,
            vehicle
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado... revisar logs'
        });
    }
};

const createVehicle = async(req, res = response) => {

    const { plate, mtcNumber, ...fields } = req.body;

    try {

        const existVehicle = await Vehicle.findOne({ plate });

        if ( existVehicle ) {
            return res.status(404).json({
                ok: false,
                msg: 'El vehiculo con placa ' + plate + ' y MTC ' + mtcNumber + ' ya se encuentra registrada.'
            });
        }

        const vehicle = new Vehicle(fields);
        await vehicle.save();

        res.json({
            ok: true,
            vehicle
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado... revisar logs'
        });
    }
};

const updateVehicle = async(req, res = response) => {
    const _id = req.params.id;

    try {

        const vehicleDB = await Vehicle.findById( _id );

        if ( !vehicleDB ) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe vehiculo con ese id'
            });
        }

        // Actualizacion
        const fields = req.body;

        const vehicleUpdated = await Vehicle.findByIdAndUpdate( _id, fields, { new: true });

        res.json({
            ok: true,
            vehicle: vehicleUpdated
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado... revisar logs'
        });
    }
};

const deleteVehicle = async(req, res = response) => {
    const _id = req.params.id;

    try {

        const vehicleDB = await Vehicle.findById( _id );

        if ( !vehicleDB ) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un vehiculo con ese id'
            });
        }

        // Validamos si es usado por un WorkOrderVehicle
        const workOrderVehicleDB = await WorkOrderVehicle.findOne({ vehicle_id: vehicleDB._id });

        if ( workOrderVehicleDB ) {
            return res.status(404).json({
                ok: false,
                msg: 'Vehiculo no puede ser eliminado porque esta asociado a una Orden de Trabajo'
            });
        }

        await Vehicle.findByIdAndDelete( _id );

        res.json({
            ok: true,
            msg: 'Vehiculo eliminado!!!'
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
    getVehicles,
    getVehicle,
    getVehicleByPlate,
    getVehicleByMtc,
    createVehicle,
    updateVehicle,
    deleteVehicle
};