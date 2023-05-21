const { response }      = require('express');
const Driver            = require('../models/driver');
const WorkOrderDriver   = require('../models/workOrderDriver');

const getDrivers = async(req, res = response) => {

    const drivers = await Driver.find();

    res.json({
        ok: true,
        drivers
    });
};

const getDriverByLicNum = async(req, res = response) => {
    const licNum = req.params.licNum;

    try {

        const driver = await Driver.findOne({ licenseNumber: licNum });

        if (!driver) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe conductor registrado con ese numero de licencia.'
            });
        }

        res.json({
            ok: true,
            driver
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado... revisar logs'
        });
    }
};

const getDriver = async(req, res = response) => {
    const _id = req.params.id;

    try {
        
        const driver = await Driver.findById( _id );

        if (!driver) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe conductor con ese Id'
            });
        };

        res.json({
            ok: true,
            driver
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado... revisar logs'
        });
    }
};

const createDriver = async(req, res = response) => {
    const { licenseNumber } = req.body;

    try {

        const existDriver = await Driver.findOne({ licenseNumber });
        if ( existDriver ) {
            return res.status(404).json({
                ok: false,
                msg: 'El conductor con licencia ' + licenseNumber + ' ya se encuentra registrado'
            });
        }

        const driver = new Driver( req.body );
        await driver.save();

        res.json({
            ok: true,
            driver
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado... revisar logs'
        });
    }
};

const updateDriver = async(req, res = response) => {
    const _id = req.params.id;

    try {

        const driverDB = await Driver.findById( _id );

        if ( !driverDB ) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe conductor con ese id'
            });
        }

        // Actualizacion
        const fields = req.body;

        const driverUpdated = await Driver.findByIdAndUpdate( _id, fields, { new: true });

        res.json({
            ok: true,
            driver: driverUpdated
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado... revisar logs'
        });
    }
};

const deleteDriver = async(req, res = response) => {
    const _id = req.params.id;

    try {
        
        const driverDB = await Driver.findById( _id );

        if ( !driverDB ) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe conductor con ese id'
            });
        }

        // Validamos si es usado en workOrderDriver
        const workOrderDriverDB = await WorkOrderDriver.findOne({ driver_id: driverDB._id });
        if ( workOrderDriverDB ) {
            return res.status(404).json({
                ok: false,
                msg: 'Conductor no puede ser eliminado porque esta asociado a una Orden de Trabajo'
            });
        }

        await Driver.findByIdAndDelete( _id );

        res.json({
            ok: true,
            msg: 'Conductor eliminado!!!'
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
    getDrivers,
    getDriverByLicNum,
    getDriver,
    createDriver,
    updateDriver,
    deleteDriver
};