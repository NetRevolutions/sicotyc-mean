const { Schema, model }   = require('mongoose');
const { TrackingSchema }  = require('./tracking');
const ObjectId            = Schema.Types.ObjectId;

const VehicleSchema = new Schema({
    plate                   : { type: String, required: true },
    mtcNumber               : { type: String, required: true },
    mtcStartDate            : { type: Date, required: true },
    mtcEndData              : { type: Date, required: true },
    brand                   : { type: String, required: false },
    axis                    : { type: Number, required: true, default: 1 },
    company_id              : { type: ObjectId, required: true },
    netWeight               : { type: Decimal128, required: false },
    utilWeight              : { type: Decimal128, required: false },
    grossWeight             : { type: Decimal128, required: false },
    length                  : { type: Decimal128, required: false },
    height                  : { type: Decimal128, required: false },
    width                   : { type: Decimal128, required: false },
    fabricationYear         : { type: Number, require: true },
    imagePath               : { type: String, required: false },
    typeOfCombustible_id    : { type: String, required: false },
    color                   : { type: String, required: true },
    ...TrackingSchema
});

module.exports = model('Vehicle', VehicleSchema);