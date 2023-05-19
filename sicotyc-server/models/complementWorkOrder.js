const { Schema, model }       = require('mongoose');
const ObjectId = Schema.Types.ObjectId;

const ComplementWorkOrderSchema = new Schema({
    workOrder_id      : { type: ObjectId, required: true, ref: 'WorkOrder' },
    complement_id     : { type: ObjectId, required: true, ref: 'Complement' },
    createdBy         : { type: String, required: true, default: 'SYSTEM' },
    createdUtc        : { type: Date, required: true, default: new Date() },
    lastModifiedBy    : { type: String, required: false },
    lastModifiedUtc   : { type: Date, required: false }
});

module.exports = model('ComplementWorkOrder', ComplementWorkOrderSchema);