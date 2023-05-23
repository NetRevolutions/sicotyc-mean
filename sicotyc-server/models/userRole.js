const { Schema, model } = require('mongoose');
const { TrackingSchema }  = require('./tracking');
const ObjectId = Schema.Types.ObjectId;

const UseRoleSchema = Schema({
    user_id           : { type: ObjectId, ref: 'User' },
    role_id           : { type: ObjectId, ref: 'Role' },
    ...TrackingSchema
});

UseRoleSchema.method('toJSON', function() {
    const { __v, ...object } = this.toObject(); // Con esto evitamos devolver la version (__v)
    return object;
});

module.exports = model('UserRole', UseRoleSchema);