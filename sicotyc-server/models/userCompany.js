const { Schema, model }   = require('mongoose');

const ObjectId = Schema.Types.ObjectId;

const UserCompanySchema = Schema({
    user              : { type: ObjectId, ref: 'User' },
    company           : { type: ObjectId, ref: 'Company' },
    createdBy         : { type: String, required: true, default: 'SYSTEM' },
    createdUtc        : { type: Date, required: true, default: new Date() },
    lastModifiedBy    : { type: String, required: false },
    lastModifiedUtc   : { type: Date, required: false }
});

UserCompanySchema.method('toJSON', function() {
    const { __v, ...object } = this.toObject(); // Con esto evitamos devolver la version (__v)
    return object;
});

module.exports = model('UserCompany', UserCompanySchema);