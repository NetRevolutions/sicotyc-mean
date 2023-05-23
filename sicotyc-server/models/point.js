const { Schema, model }   = require('mongoose');
const { TrackingSchema }  = require('./tracking');
const ObjectId            = Schema.Types.ObjectId;

const PointSchema = new Schema({
    pointName         : { type: String, unique: true, required: true },
    pointAliasName    : { type: String, unique: true, required: false },
    pointType         : { type: [String], required: true, default: [] }, // Usado para saber que tipo de point mostramos
    observations      : { type: String, required: false },
    ...TrackingSchema
});

PointSchema.method('toJSON', function() {
    const { __v, ...object } = this.toObject(); // Con esto evitamos devolver la version (__v)
    return object;
});

module.exports = model('Point', PointSchema);

/**
 * Leyenda para pointType
 * A: Almacen
 * C: Ciudad
 */