const { Schema, model }   = require('mongoose');
const { TrackingSchema }  = require('./tracking');
const ObjectId            = Schema.Types.ObjectId;

const WorkOrderDriverSchema = new Schema({
    workOrder_id      : { type: ObjectId, required: true, ref: 'WorkOrder' },
    driver_id         : { type: ObjectId, required: true, ref: 'Driver' },
    ...TrackingSchema
});

WorkOrderDriverSchema.method('toJSON', function() {
    const { __v, ...object } = this.toObject(); // Con esto evitamos devolver la version (__v)
    return object;
});

module.exports = model('WorkOrderDriver', WorkOrderDriverSchema);