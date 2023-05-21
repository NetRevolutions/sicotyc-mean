const { Schema, model }   = require('mongoose');
const { TrackingSchema }  = require('./tracking');
const ObjectId            = Schema.Types.ObjectId;

const WorkOrderComplementSchema = new Schema({
    workOrder_id      : { type: ObjectId, required: true, ref: 'WorkOrder' },
    complement_id     : { type: ObjectId, required: true, ref: 'Complement' },
    ...TrackingSchema    
});

module.exports = model('WorkOrderComplement', WorkOrderComplementSchema);