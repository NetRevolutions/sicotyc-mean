const { Schema, model }   = require('mongoose');
const ObjectId            = Schema.Types.ObjectId;

const PointSchema = new Schema({
    pointName         : { type: String, unique: true, required: true },
    pointAliasname    : { type: String, unique: true, required: false },
    pointType         : { type: [String], required: true, default: [] }, // Usado para saber que tipo de point mostramos
    observations      : { type: String, required: false },
    createdBy         : { type: String, required: true, default: 'SYSTEM' },
    createdUtc        : { type: Date, required: true, default: new Date() },
    lastModifiedBy    : { type: String, required: false },
    lastModifiedUtc   : { type: String, required: false }
});

module.exports = model('Point', PointSchema);

/**
 * Leyenda para pointType
 * A: Almacen
 * C: Ciudad
 */