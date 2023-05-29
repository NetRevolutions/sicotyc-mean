const { Schema, model }   = require('mongoose');

const DriverSchema = new Schema({
    firstName           : { type: String, required: true },
    lastName            : { type: String, required: true },
    typeOfDocument_id   : { type: String, required: true },
    documentNumber      : { type: String, required: true },
    email               : { type: String, required: true },
    mobile              : { type: String, required: true },
    licenseNumber       : { type: String, unique: true, required: true },
    typeOfLicense_id    : { type: String, required: true },
    hasEspecialLicense  : { type: Boolean, required: false, default: false },
    expeditionDate      : { type: Date, required: true },
    expireDate          : { type: Date, required: true },
    birthDate           : { type: Date, required: true },
    address             : { type: String, required: false },
    restriction         : { type: String, required: false },
    imagePath           : { type: String, required: false },
    createdBy           : { type: String, required: true, default: 'SYSTEM' },
    createdUtc          : { type: Date, required: true, default: new Date() },
    lastModifiedBy      : { type: String, required: false },
    lastModifiedUtc     : { type: Date, required: false }
});

DriverSchema.method('toJSON', function() {
    const { __v, ...object } = this.toObject(); // Con esto evitamos devolver la version (__v)
    return object;
});

module.exports = model('Driver', DriverSchema);