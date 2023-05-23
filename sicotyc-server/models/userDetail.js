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

UserDetailSchema.method('toJSON', function() {
    const { __v, ...object } = this.toObject(); // Con esto evitamos devolver la version (__v)
    return object;
});

module.exports = model('UserDetail', UserDetailSchema);