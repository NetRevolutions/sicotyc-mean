const { Schema, model }   = require('mongoose');
const { TrackingSchema }  = require('./tracking');
const ObjectId            = Schema.Types.ObjectId;

const VehiculeWorkOrderSchema = new Schema({
    workOrder_id    : { type: ObjectId, required: true, ref: 'WorkOrder' },
    vehicle_id      : { type: ObjectId, required: true, ref: 'Vehicle' },
    ...TrackingSchema
});

module.exports = model('VehicleWorkOrder', VehiculeWorkOrderSchema);