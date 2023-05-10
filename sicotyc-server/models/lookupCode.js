const { Schema, model } = require('mongoose');

const ObjectId = Schema.Types.ObjectId;

const lookupCodeSchema = new Schema({    
    lookupCodeGroupId   : { type: ObjectId, required: true },
    lookupCodeValue     : { type: String, required: true },
    lookupCodeName      : { type: String, required: true },
    lookupCodeOrder     : { type: Number, default: 0 }
});

module.exports = model('LookupCode', lookupCodeSchema);