const { Schema, model } = require('mongoose');

const ObjectId = Schema.Types.ObjectId;

const UserDetailSchema = new Schema({
    userId              : { type: ObjectId, required: true },
    dateOfBirth         : { type: Date, required: true },
    address             : { type: String },
    typeOfDocumentId    : { type: ObjectId, required: true },
    numberOfDocument    : { type: String, required: true }
});

module.exports = model('UserDetail', UserDetailSchema);