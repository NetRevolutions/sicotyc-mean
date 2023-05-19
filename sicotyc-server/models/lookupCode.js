const { Schema, model } = require('mongoose');

const ObjectId = Schema.Types.ObjectId;

const lookupCodeSchema = new Schema({    
    lookupCodeGroup_id    : { type: ObjectId, required: true, ref: 'LookupCodeGroup' },
    lookupCodeValue       : { type: String, required: true },
    lookupCodeName        : { type: String, required: true },
    lookupCodeOrder       : { type: Number, default: 0 },
    createdBy             : { type: String, required: true, default: 'SYSTEM' },
    createdUtc            : { type: Date, required: true, default: new Date() },
    lastModifiedBy        : { type: String, required: false },
    lastModifiedUtc       : { type: Date, required: false }
});

module.exports = model('LookupCode', lookupCodeSchema);