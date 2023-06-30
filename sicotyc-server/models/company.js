const { Schema, model }   = require('mongoose');

const CompanySchema = new Schema({    
    ruc                       : { type: String, unique: true, maxLength: 11, required: true },
    nombreComercial           : { type: String, required: true },
    estadoContribuyente       : { type: String, required: false },
    condicionContribuyente    : { type: String, required: false },
    domicilioFiscal           : { type: String, required: false },
    companyEmail              : { type: String, required: true },
    companyPhone              : { type: String, required: true },
    typeOfCompany             : { type: String, required: true },
    createdBy                 : { type: String, required: true, default: 'SYSTEM' },
    createdUtc                : { type: Date, required: true, default: new Date() },
    lastModifiedBy            : { type: String, required: false },
    lastModifiedUtc           : { type: Date, required: false }
});

CompanySchema.method('toJSON', function() {
    const { __v, ...object } = this.toObject(); // Con esto evitamos devolver la version (__v)
    return object;
});


module.exports = model('Company', CompanySchema);