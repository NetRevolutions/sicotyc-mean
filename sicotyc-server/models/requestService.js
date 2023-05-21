const { Schema, model }   = require('mongoose');
const { TrackingSchema }  = require('./tracking');
const ObjectId            = Schema.Types.ObjectId;

const RequestServiceSchema = new Schema({
    // Service Request
    requestedFirstName          : { type: String, required: true },
    requestedLastName           : { type: String, required: true },
    requestedEmail              : { type: String, required: true },
    requestedPhone              : { type: String, required: true },
    requestedRuc                : { type: String, required: true },
    requestedCompanyMail        : { type: String, required: true },
    // Service Detail
    typeOfService_id            : { type: String, required: true },
    numberOfService             : { type: Number, required: true, default: 1 },
    dateOfService               : { type: Date, required: true },
    sizeContainer_id            : { type: String, required: false },
    canUseContainerSize40       : { type: Boolean, default: false },
    pointOne_id                 : { type: ObjectId, required: true, ref: 'Point' },
    referencePointOne           : { type: String },
    pointTwo_id                 : { type: ObjectId, required: true, ref: 'Point' },
    referencePointTwo           : { type: String },
    pointThree_id               : { type: ObjectId, required: false, ref: 'Point' },
    referencePointThree         : { type: String },
    custodyRequired             : { type: Boolean, default: false },
    crewRequired                : { type: Boolean, default: false },
    rateOffered                 : { type: String, required: true },
    rateOfferedMoney_id         : { type: String, required: false },
    additionalComments          : { type: String, required: false },
    requestedStatus_id          : { type: String, required: true, default: 'PRV' }, // Pendiente de Revision
    requestedDenegate_id        : { type: String, required: false },
    requestedDenegateComments   : { type: String, required: false },
    answerByMail                : { type: Boolean, required: false },
    workOrder_id                : { type: ObjectId, ref: 'WorkOrder'},
    ...TrackingSchema
});

module.exports = model('RequestService', RequestServiceSchema);