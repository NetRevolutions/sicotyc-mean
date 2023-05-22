const { Schema, model }   = require('mongoose');
const { TrackingSchema }  = require('./tracking');
const ObjectId            = Schema.Types.ObjectId;

const WorkOrderSchema = new Schema({
    requestService_id           : { type: ObjectId, required: true, ref: 'RequestService' },
    referenceRate               : { type: String, required: false },
    referenceRateMoneyType_id   : { type: String, required: false },
    finalRate                   : { type: String, required: false },
    finalRateMoneyType_id       : { type: String, required: false },
    workOrderStatus_id          : { type: String, required: true, default: 'PAS' },
    billNumber                  : { type: String, required: false },
    billComments                : { type: String, required: false },
    ...TrackingSchema

});

module.exports = model('WorkOrder', WorkOrderSchema);