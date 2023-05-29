const { Schema, model } = require('mongoose');
const ObjectId = Schema.Types.ObjectId;

const LookupCodeSchema = new Schema({    
    lookupCodeGroup       : { type: ObjectId, ref: 'LookupCodeGroup' },
    lookupCodeValue       : { type: String, required: true },
    lookupCodeName        : { type: String, required: true },
    lookupCodeOrder       : { type: Number, default: 0 },
    createdBy             : { type: String, required: true, default: 'SYSTEM' },
    createdUtc            : { type: Date, required: true, default: new Date() },
    lastModifiedBy        : { type: String, required: false },
    lastModifiedUtc       : { type: Date, required: false }
});

LookupCodeSchema.method('toJSON', function() {
    const { __v, ...object } = this.toObject(); // Con esto evitamos devolver la version (__v)
    return object;
});

module.exports = model('LookupCode', LookupCodeSchema);