const { Schema, model }       = require('mongoose');
const ObjectId = Schema.Types.ObjectId;
const Decimal128 = Schema.Types.Decimal128

const ComplementSchema = new Schema({    
    plate                   : { type: String, required: true },
    mtcNumber               : { type: String, required: true },
    mtcStartDate            : { type: Date, required: true },
    mtcEndData              : { type: Date, required: true },
    brand                   : { type: String, required: false },
    axis                    : { type: Number, required: true, default: 1 },
    company_id              : { type: ObjectId, required: true, ref: 'Company' },
    netWeight               : { type: Decimal128, required: false },
    utilWeight              : { type: Decimal128, required: false },
    grossWeight             : { type: Decimal128, required: false },
    length                  : { type: Decimal128, required: false },
    height                  : { type: Decimal128, required: false },
    width                   : { type: Decimal128, required: false },
    fabricationYear         : { type: Number, require: true },
    imagePath               : { type: String, required: false },
    combustible_id          : { type: String, required: false },
    color                   : { type: String, required: true },
    createdBy               : { type: String, required: true, default: 'SYSTEM' },
    createdUtc              : { type: Date, required: true, default: new Date() },
    lastModifiedBy          : { type: String, required: false },
    lastModifiedUtc         : { type: Date, required: false }
});

module.exports = model('Complement', ComplementSchema);