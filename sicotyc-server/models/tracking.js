const { Schema, model }       = require('mongoose');

const TrackingSchema = new Schema({
    createdBy                 : { type: String, required: true, default: 'SYSTEM' },
    createdUtc                : { type: Date, required: true, default: new Date() },
    lastModifiedBy            : { type: String, required: false },
    lastModifiedUtc           : { type: Date, required: false }
});

module.exports = model('Tracking', TrackingSchema);