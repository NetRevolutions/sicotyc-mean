const { Schema, model } = require('mongoose');

const ObjectId = Schema.Types.ObjectId;

const UseRoleSchema = Schema({
    userId            : { type: ObjectId, required: true },
    roleId            : { type: ObjectId, required: true },
    createdBy         : { type: String, required: true, default: 'SYSTEM' },
    createdUtc        : { type: Date, required: true, default: new Date() },
    lastModifiedBy    : { type: String, required: false },
    lastModifiedUtc   : { type: Date, required: false }
});

module.exports = model('UserRole', UseRoleSchema);