const { Schema, model }   = require('mongoose');
const { TrackingSchema }  = require('./tracking');
const ObjectId            = Schema.Types.ObjectId;

const WorkOrderComplementSchema = new Schema({
    workOrder_id      : { type: ObjectId, required: true, ref: 'WorkOrder' },
    complement_id     : { type: ObjectId, required: true, ref: 'Complement' },
    ...TrackingSchema    
});

WorkOrderComplementSchema.method('toJSON', function() {
    const { __v, ...object } = this.toObject(); // Con esto evitamos devolver la version (__v)
    return object;
});

module.exports = model('WorkOrderComplement', WorkOrderComplementSchema);