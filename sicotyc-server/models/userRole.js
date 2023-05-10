const { Schema, model } = require('mongoose');

const ObjectId = Schema.Types.ObjectId;

const UseRoleSchema = Schema({
    userId    : { type: ObjectId, required: true },
    roleId    : { type: ObjectId, required: true }
});

module.exports = model('UserRole', UseRoleSchema);