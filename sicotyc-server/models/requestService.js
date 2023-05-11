const { Schema, model }   = require('mongoose');
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
    typeOfServiceId             : { type: String, required: true },
    numberOfService             : { type: Number, required: true, default: 1 },
    dateOfService               : { type: Date, required: true },
    sizeContainerId             : { type: String, required: false },
    canUseContainerSize40       : { type: Boolean, default: false },
    pointOneId                  : { type: ObjectId, required: true },
    referencePointOne           : { type: String },
    pointTwoId                  : { type: ObjectId, required: true },
    referencePointTwo           : { type: String },
    pointThreeId                : { type: ObjectId, required: false },
    referencePointThree         : { type: String },
    custodyRequired             : { type: Boolean, default: false },
    crewRequired                : { type: Boolean, default: false },
    rateOffered                 : { type: String, required: true },
    rateOfferedMoneyId          : { type: String, required: false },
    additionalComments          : { type: String, required: false },
    requestedStatusId           : { type: String, required: true, default: 'PRV' }, // Pendiente de Revision
    requestedDenegateId         : { type: String, required: false },
    requestedDenegateComments   : { type: String, required: false },
    answerByMail                : { type: Boolean, required: false },
    orderServiceId              : { type: ObjectId, required: false },
    createdBy                   : { type: String, required: true, default: 'SYSTEM' },
    createdUtc                  : { type: Date, required: true, default: new Date() },
    lastModifiedBy              : { type: String, required: false },
    lastModifiedUtc             : { type: Date, required: false }

});

module.exports = model('RequestService', RequestServiceSchema);