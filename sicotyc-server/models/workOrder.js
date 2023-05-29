const { Schema, model }   = require('mongoose');
const ObjectId            = Schema.Types.ObjectId;

const WorkOrderSchema = new Schema({
    requestService              : { type: ObjectId, ref: 'RequestService' },
    workOrderCode               : { type: String, required: true, unique: true },
    referenceRate               : { type: String, required: false },
    referenceRateMoneyType_id   : { type: String, required: false },
    finalRate                   : { type: String, required: false },
    finalRateMoneyType_id       : { type: String, required: false },
    workOrderStatus_id          : { type: String, required: true, default: 'PAS' },
    billNumber                  : { type: String, required: false },
    billComments                : { type: String, required: false },
    createdBy                   : { type: String, required: true, default: 'SYSTEM' },
    createdUtc                  : { type: Date, required: true, default: new Date() },
    lastModifiedBy              : { type: String, required: false },
    lastModifiedUtc             : { type: Date, required: false }
});

WorkOrderSchema.method('toJSON', function() {
    const { __v, ...object } = this.toObject(); // Con esto evitamos devolver la version (__v)
    return object;
});

module.exports = model('WorkOrder', WorkOrderSchema);