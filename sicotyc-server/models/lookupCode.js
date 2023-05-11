const { Schema, model } = require('mongoose');

const ObjectId = Schema.Types.ObjectId;

const lookupCodeSchema = new Schema({    
    lookupCodeGroupId   : { type: ObjectId, required: true },
    lookupCodeValue     : { type: String, required: true },
    lookupCodeName      : { type: String, required: true },
    lookupCodeOrder     : { type: Number, default: 0 },
    createdBy           : { type: String, required: true, default: 'SYSTEM' },
    createdUtc          : { type: Date, required: true, default: new Date() },
    lastModifiedBy      : { type: String, required: false },
    lastModifiedUtc     : { type: Date, required: false }
});

module.exports = model('LookupCode', lookupCodeSchema);