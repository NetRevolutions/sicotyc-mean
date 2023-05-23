const { Schema, model }   = require('mongoose');
const { TrackingSchema }  = require('./tracking');
const ObjectId            = Schema.Types.ObjectId;

const WorkOrderVehiculeSchema = new Schema({
    workOrder_id    : { type: ObjectId, required: true, ref: 'WorkOrder' },
    vehicle_id      : { type: ObjectId, required: true, ref: 'Vehicle' },
    ...TrackingSchema
});

WorkOrderVehiculeSchema.method('toJSON', function() {
    const { __v, ...object } = this.toObject(); // Con esto evitamos devolver la version (__v)
    return object;
});

module.exports = model('WorkOrderVehicle', WorkOrderVehiculeSchema);