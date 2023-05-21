const { Schema, model }   = require('mongoose');
const { TrackingSchema }  = require('./tracking');

const ObjectId = Schema.Types.ObjectId;

const UserDetailSchema = new Schema({
    user_id             : { type: ObjectId, required: true, ref: 'User' },
    dateOfBirth         : { type: Date, required: true },
    address             : { type: String },
    typeOfDocument_id   : { type: ObjectId, required: true },
    numberOfDocument    : { type: String, required: true },
    ...TrackingSchema
});

module.exports = model('UserDetail', UserDetailSchema);