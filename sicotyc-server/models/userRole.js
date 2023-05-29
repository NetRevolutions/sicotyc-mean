const { Schema, model } = require('mongoose');
const ObjectId = Schema.Types.ObjectId;

const UseRoleSchema = Schema({
    user              : { type: ObjectId, required: true, ref: 'User' },
    role              : { type: ObjectId, required: true, ref: 'Role' },
    createdBy         : { type: String, required: true, default: 'SYSTEM' },
    createdUtc        : { type: Date, required: true, default: new Date() },
    lastModifiedBy    : { type: String, required: false },
    lastModifiedUtc   : { type: Date, required: false }
});

UseRoleSchema.method('toJSON', function() {
    const { __v, ...object } = this.toObject(); // Con esto evitamos devolver la version (__v)
    return object;
});

module.exports = model('UserRole', UseRoleSchema);