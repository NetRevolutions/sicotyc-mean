const { Schema, model } = require('mongoose');
const { TrackingSchema }  = require('./tracking');
const ObjectId = Schema.Types.ObjectId;

const UseRoleSchema = Schema({
    user_id           : { type: ObjectId, required: true, ref: 'User' },
    role_id           : { type: ObjectId, required: true, ref: 'Role' },
    ...TrackingSchema
});

module.exports = model('UserRole', UseRoleSchema);