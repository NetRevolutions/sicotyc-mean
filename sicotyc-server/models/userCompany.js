const { Schema, model } = require('mongoose');

const ObjectId = Schema.Types.ObjectId;

const UserCompanySchema = Schema({
    userId    : { type: ObjectId, required: true },
    companyId : { type: ObjectId, required: true }
});

module.exports = model('UserCompany', UserCompanySchema);