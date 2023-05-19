const { Schema, model }   = require('mongoose');
const ObjectId            = Schema.Types.ObjectId;

const WorkOrderSchema = new Schema({
    requestService_id       : { type: ObjectId, required: true, ref: 'RequestService' },
    referenceRate           : { type: String, required: false },
    referenceRateMoney_id   : { type: ObjectId, required: false }, // Revisar
    finalRate               : { type: String, required: false },
    finalRateMoney_id       : { type: ObjectId, required: false }, // Revisar
    workOrderStatus_id      : { type: String, required: true, default: 'PAS' },
    billNumber              : { type: String, required: false },
    billComments            : { type: String, required: false },
    createdBy               : { type: String, required: true, default: 'SYSTEM' },
    createdUtc              : { type: Date, required: true, default: new Date() },
    lastModifiedBy          : { type: String, required: false },
    lastModifiedUtc         : { type: Date, required: false }

});

module.exports = model('WorkOrder', WorkOrderSchema);