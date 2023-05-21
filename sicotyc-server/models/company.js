const { Schema, model }   = require('mongoose');
const { TrackingSchema }    = require('./tracking');
const ObjectId            = Schema.Types.ObjectId;

const CompanySchema = new Schema({    
    ruc                       : { type: String, unique: true, maxLength: 11, required: true },
    nombreComercial           : { type: String, required: true },
    estadoContribuyente       : { type: String, required: true },
    condicionContribuyente    : { type: String, required: true },
    domicilioFiscal           : { type: String },
    companyEmail              : { type: String, required: true},
    companyPhone              : { type: String, required: true },
    typeOfCompany_id          : { type: String, required: true },
    ...TrackingSchema  
});


module.exports = model('Company', CompanySchema);