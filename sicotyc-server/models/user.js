const { Schema, model }   = require('mongoose');
const { TrackingSchema }  = require('./tracking');

const ObjectId = Schema.Types.ObjectId;

const UserSchema = Schema({    
    firstName                 : { type: String, required: true },
    lastName                  : { type: String, required: true },
    userName                  : { type: String, unique: true, required: true },
    email                     : { type: String, unique: true, required: true },
    emailConfirmed            : { type: Boolean, default: false },
    password                  : { type: String, required: true },
    imagePath                 : { type: String },
    role                      : { type: ObjectId, ref: 'Role' },
    refreshToken              : { type: String },
    refreshTokenExpiryTime    : { type: Date },
    ...TrackingSchema
});

UserSchema.method('toJSON', function() {
    const {__v, _id, password, ...object } = this.toObject(); // Con esto evitamos devolver __v y _id, el resto se devuelve 
    object.uid = _id; // Con esto le seteamos a una variable definida por el usuario el valor de _id
    return object;
}); 

module.exports = model('User', UserSchema);