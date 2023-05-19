const { Schema, model } = require('mongoose');

const ObjectId = Schema.Types.ObjectId;

const UserDetailSchema = new Schema({
    user_id             : { type: ObjectId, required: true, ref: 'User' },
    dateOfBirth         : { type: Date, required: true },
    address             : { type: String },
    typeOfDocument_id   : { type: ObjectId, required: true },
    numberOfDocument    : { type: String, required: true },
    createdBy           : { type: String, required: true, default: 'SYSTEM' },
    createdUtc          : { type: Date, required: true, default: new Date() },
    lastModifiedBy      : { type: String, required: false },
    lastModifiedUtc     : { type: Date, required: false }
});

module.exports = model('UserDetail', UserDetailSchema);