const { Schema, model }       = require('mongoose');
const ObjectId = Schema.Types.ObjectId;

const DriverWorkOrderSchema = new Schema({
    // Pending more fields....


    createdBy                 : { type: String, required: true, default: 'SYSTEM' },
    createdUtc                : { type: Date, required: true, default: new Date() },
    lastModifiedBy            : { type: String, required: false },
    lastModifiedUtc           : { type: Date, required: false }
});

module.exports = model('DriverWorkOrder', DriverWorkOrderSchema);