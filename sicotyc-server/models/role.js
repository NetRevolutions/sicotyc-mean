const { Schema, model }   = require('mongoose');
const { TrackingSchema }  = require('./tracking');

const RoleSchema = Schema({    
    roleName          : { type: String, required: true, unique: true },
    ...TrackingSchema
}, 
{ 
    collection: 'roles' // <== con esto indico el nombre que debe de mostrarse en la collecion 
});

RoleSchema.method('toJSON', function() {
    const {__v, ...object }  = this.toObject(); // Con esto evitamos devolver __v, el resto se devuelve
    return object;
}); 

module.exports = model('Role', RoleSchema);