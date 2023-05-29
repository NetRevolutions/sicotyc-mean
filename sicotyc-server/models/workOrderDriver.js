const { Schema, model }   = require('mongoose');
const ObjectId            = Schema.Types.ObjectId;

const WorkOrderDriverSchema = new Schema({
    workOrder       : { type: ObjectId, ref: 'WorkOrder' },
    driver          : { type: ObjectId, ref: 'Driver' },
    createdBy       : { type: String, required: true, default: 'SYSTEM' },
    createdUtc      : { type: Date, required: true, default: new Date() },
    lastModifiedBy  : { type: String, required: false },
    lastModifiedUtc : { type: Date, required: false }
});

WorkOrderDriverSchema.method('toJSON', function() {
    const { __v, ...object } = this.toObject(); // Con esto evitamos devolver la version (__v)
    return object;
});

module.exports = model('WorkOrderDriver', WorkOrderDriverSchema);