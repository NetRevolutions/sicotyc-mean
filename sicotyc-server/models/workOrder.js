const { Schema, model }   = require('mongoose');
const ObjectId            = Schema.Types.ObjectId;

const WorkOrderSchema = new Schema({
    requestServiceId        : { type: ObjectId, required: true },
    referenceRate           : { type: String, required: false },
    referenceRateMoneyId    : { type: ObjectId, required: false },
    finalRate               : { type: String, required: false },
    finalRateMoneyId        : { type: ObjectId, required: false },
    workOrderStatusId       : { type: String, required: true, default: 'PAS' },
    billNumber              : { type: String, required: false },
    billComments            : { type: String, required: false },
    createdBy               : { type: String, required: true, default: 'SYSTEM' },
    createdUtc              : { type: Date, required: true, default: new Date() },
    lastModifiedBy          : { type: String, required: false },
    lastModifiedUtc         : { type: Date, required: false }


});

module.exports = model('WorkOrder', WorkOrderSchema);