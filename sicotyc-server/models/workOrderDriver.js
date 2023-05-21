const { Schema, model }   = require('mongoose');
const { TrackingSchema }  = require('./tracking');
const ObjectId            = Schema.Types.ObjectId;

const WorkOrderDriverSchema = new Schema({
    workOrder_id      : { type: ObjectId, required: true, ref: 'WorkOrder' },
    driver_id         : { type: ObjectId, required: true, ref: 'Driver' },
    ...TrackingSchema
});

module.exports = model('WorkOrderDriver', WorkOrderDriverSchema);