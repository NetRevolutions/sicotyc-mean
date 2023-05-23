const { Schema, model }   = require('mongoose');
const { TrackingSchema }    = require('./tracking');
const ObjectId            = Schema.Types.ObjectId;

const CompanySchema = new Schema({    
    ruc                       : { type: String, unique: true, maxLength: 11, required: true },
    nombreComercial           : { type: String, required: true },
    estadoContribuyente       : { type: String, required: false },
    condicionContribuyente    : { type: String, required: false },
    domicilioFiscal           : { type: String, required: false },
    companyEmail              : { type: String, required: true },
    companyPhone              : { type: String, required: true },
    typeOfCompany_id          : { type: String, required: true },
    ...TrackingSchema  
});

CompanySchema.method('toJSON', function() {
    const { __v, ...object } = this.toObject(); // Con esto evitamos devolver la version (__v)
    return object;
});


module.exports = model('Company', CompanySchema);