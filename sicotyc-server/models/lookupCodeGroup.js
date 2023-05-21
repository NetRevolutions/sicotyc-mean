const { Schema, model }   = require('mongoose');
const { TrackingSchema }  = require('./tracking');

const LoockupCodeGroupSchema = new Schema({    
    lookupCodeGroupName : { type: String, required: true },
    ...TrackingSchema
});

module.exports = model('LookupCodeGroup', LoockupCodeGroupSchema);