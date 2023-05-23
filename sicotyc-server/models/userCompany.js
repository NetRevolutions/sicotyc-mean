const { Schema, model }   = require('mongoose');
const { TrackingSchema }  = require('./tracking');

const ObjectId = Schema.Types.ObjectId;

const UserCompanySchema = Schema({
    user_id            : { type: ObjectId, required: true, ref: 'User' },
    company_id         : { type: ObjectId, required: true, ref: 'Company' },
    ...TrackingSchema
});

UserCompanySchema.method('toJSON', function() {
    const { __v, ...object } = this.toObject(); // Con esto evitamos devolver la version (__v)
    return object;
});

module.exports = model('UserCompany', UserCompanySchema);