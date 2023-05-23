const { Schema, model } = require('mongoose');
const { TrackingSchema }    = require('./tracking');
const ObjectId = Schema.Types.ObjectId;

const LookupCodeSchema = new Schema({    
    lookupCodeGroup_id    : { type: ObjectId, required: true, ref: 'LookupCodeGroup' },
    lookupCodeValue       : { type: String, required: true },
    lookupCodeName        : { type: String, required: true },
    lookupCodeOrder       : { type: Number, default: 0 },
    ...TrackingSchema    
});

LookupCodeSchema.method('toJSON', function() {
    const { __v, ...object } = this.toObject(); // Con esto evitamos devolver la version (__v)
    return object;
});

module.exports = model('LookupCode', LookupCodeSchema);