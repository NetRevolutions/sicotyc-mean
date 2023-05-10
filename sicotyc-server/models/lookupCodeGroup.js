const { Schema, model } = require('mongoose');

const LoockupCodeGroupSchema = new Schema({    
    lookupCodeGroupName : { type: String, required: true }
});

module.exports = model('LookupCodeGroup', LoockupCodeGroupSchema);