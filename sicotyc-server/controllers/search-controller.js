const { response }      = require('express');

const Company = require('../models/company');
const Complement = require('../models/complement');
const Driver = require('../models/driver');
const LookupCode        = require('../models/lookupCode');
const LookupCodeGroup   = require('../models/lookupCodeGroup');
const Point = require('../models/point');
const User = require('../models/user');
const Vehicle = require('../models/vehicle');

const searchAll = async(req, res = response) => {

    const fieldToSearch = req.params.fieldToSearch;
    const regex = new RegExp( fieldToSearch, 'i');   

    const [
        companies, complements, drivers, 
        lookupCodes, lookupCodeGroups, points,
        users, vehicles
    ] = await Promise.all([
        Company.find({ nombreComercial: regex }),
        Complement.find({ plate: regex }),
        Driver.find({ $or: [{ firstName: regex } , { lastName: regex }] }),
        LookupCode.find({ lookupCodeName: regex }),
        LookupCodeGroup.find({ lookupCodeGroupName: regex }),
        Point.find({ $or: [{ pointName: regex }, { pointAliasName: regex }]}),
        User.find({ $or: [{ firstName: regex }, { lastName: regex }, { userName: regex }, { email: regex }]}),
        Vehicle.find({ $or: [{ mtcNumber: regex }, { brand: regex }]})
    ]);

    res.json({
        ok: true,
        companies,
        complements,    
        drivers,
        lookupCodes,
        lookupCodeGroups,
        points,
        users,
        vehicles
    })
};

const searchByCollection = async(req, res = response) => {
    const collection = req.params.collection;
    const fieldToSearch = req.params.fieldToSearch;
    const regex = new RegExp( fieldToSearch, 'i');
    let data = [];

    switch (collection) {
        case 'company':
            data = await Company.find({ nombreComercial: regex });
            break;
        case 'complement':
            data = await Complement.find({ plate: regex })
                                    .populate('Company', 'ruc nombreComercial');
            break;
        case 'driver':
            data = await Driver.find({ $or: [{ firstName: regex } , { lastName: regex }] });
            break;
        case 'lookupCode':
            data = await LookupCode.find({ lookupCodeName: regex })
                                    .populate('LookupCodeGroup', '_id lookupCodeGroupName');
            break;
        case 'lookupCodeGroup':
            data = await LookupCodeGroup.find({ lookupCodeGroupName: regex });
            break;
        case 'Point':
            data = await Point.find({ $or: [{ pointName: regex }, { pointAliasName: regex }]});
            break;
        case 'user':
            data = await User.find({ $or: [{ firstName: regex }, { lastName: regex }, { userName: regex }, { email: regex }]});
            break;
        case 'vehicle':
            data = await Vehicle.find({ $or: [{ mtcNumber: regex }, { brand: regex }]})
                                    .populate('Company', 'ruc nombreComercial');
            break;    
        default:
            return res.status(400).json({
                ok: false,
                msg: 'La colecion a buscar no existe.'
            });
            // break;
    }

    res.json({
        ok: true,
        result: data
    });
};

module.exports = {
    searchAll,
    searchByCollection
}