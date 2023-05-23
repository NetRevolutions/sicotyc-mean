const { Schema, model }   = require('mongoose');
const { TrackingSchema }  = require('./tracking');

const LoockupCodeGroupSchema = new Schema({    
    lookupCodeGroupName : { type: String, required: true },
    ...TrackingSchema
});

LoockupCodeGroupSchema.method('toJSON', function() {
    const { __v, ...object } = this.toObject(); // Con esto evitamos devolver la version (__v)
    return object;
});

module.exports = model('LookupCodeGroup', LoockupCodeGroupSchema);