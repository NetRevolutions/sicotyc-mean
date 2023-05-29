const { Schema, model }   = require('mongoose');
const ObjectId = Schema.Types.ObjectId;

const UserDetailSchema = new Schema({
    user                : { type: ObjectId, ref: 'User' },
    dateOfBirth         : { type: Date, required: true },
    address             : { type: String },
    typeOfDocument      : { type: String, required: true },
    numberOfDocument    : { type: String, required: true },
    createdBy           : { type: String, required: true, default: 'SYSTEM' },
    createdUtc          : { type: Date, required: true, default: new Date() },
    lastModifiedBy      : { type: String, required: false },
    lastModifiedUtc     : { type: Date, required: false }
});

UserDetailSchema.method('toJSON', function() {
    const { __v, ...object } = this.toObject(); // Con esto evitamos devolver la version (__v)
    return object;
});

module.exports = model('UserDetail', UserDetailSchema);