const { Schema, model } = require('mongoose');

const RoleSchema = Schema({    
    roleName          : { type: String, required: true, unique: true },
    createdBy         : { type: String, required: true, default: 'SYSTEM' },
    createdUtc        : { type: Date, required: true, default: new Date() },
    lastModifiedBy    : { type: String, required: false },
    lastModifiedUtc   : { type: Date, required: false }
}, 
{ 
    collection: 'roles' // <== con esto indico el nombre que debe de mostrarse en la collecion 
});

RoleSchema.method('toJSON', function() {
    const {__v, _id, ...object }  = this.toObject(); // Con esto evitamos devolver __v y _id, el resto se devuelve
    object.uid                    = _id; // Con esto le seteamos a una variable definida por el usuario el valor de _id
    return object;
}); 

module.exports = model('Role', RoleSchema);