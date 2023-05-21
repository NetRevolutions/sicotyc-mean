const { Schema, model }   = require('mongoose');
const { TrackingSchema }  = require('./tracking');

const DriverSchema = new Schema({
    firstName       : { type: String, required: true },
    lastName        : { type: String, required: true },
    licenseNumber   : { type: String, unique: true, required: true },
    class_id        : { type: String, required: true },
    category_id     : { type: String, required: true },
    expeditionDate  : { type: Date, required: true },
    expireDate      : { type: Date, required: true },
    birthDate       : { type: Date, required: true },
    address         : { type: String, required: true },
    restriction     : { type: String, required: false },
    imagePath       : { type: String, required: false },
    ...TrackingSchema
});

module.exports = model('Driver', DriverSchema);