const { Schema, model } = require('mongoose');
const { TrackingSchema }    = require('./tracking');
const ObjectId = Schema.Types.ObjectId;

const lookupCodeSchema = new Schema({    
    lookupCodeGroup_id    : { type: ObjectId, required: true, ref: 'LookupCodeGroup' },
    lookupCodeValue       : { type: String, required: true },
    lookupCodeName        : { type: String, required: true },
    lookupCodeOrder       : { type: Number, default: 0 },
    ...TrackingSchema    
});

module.exports = model('LookupCode', lookupCodeSchema);