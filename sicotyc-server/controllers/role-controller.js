const { response }  = require('express'); // Con esto hacemos que el response traiga todas su propiedades.
const Role          = require('../models/role');

const getRoles = async(req, res) => {

    const roles = await Role.find();
    //const roles = await Role.find({}, 'roleName'); // Tambien se puede aplicar filtros

    res.json({
        ok: true,
        roles
    });
};

const getRole = async(req, res = response) => {
    const _id = req.params.id;

    try {

        const role = await Role.findById( _id );

        if ( !role ) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe role con ese id'
            });
        }

        res.json({
            ok: true,
            role
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado... revisar logs'
        });
    }
};

const createRole = async(req, res = response) => {
    
    const { roleName, ...fields } = req.body;

    try {
        const existRole = await Role.findOne({ roleName });

        if (existRole) {
            return res.status(400).json({
                ok: false,
                msg: 'El role ya se encuentra registrado'
            });
        }

        // Creacion
        fields.createdBy = req.uid;
        fields.createdUtc = new Date();

        const role = new Role( fields );
        await role.save();

        res.json({
            ok: true,
            role
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado... revisar logs'
        });
    }    
};

const updateRole = async ( req, res = response ) => {
    // TODO: Validar token y comprobar si es el usuario correcto

    const uid = req.params.id;
    
    try {

        const roleDB = await Role.findById( uid );

        if ( !roleDB ) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un usuario por ese id'
            });
        }

        // Actualizacion
        const fields = req.body;
        fields.lastModifiedBy = req.uid;
        fields.lastModifiedUtc = new Date();
        
        // delete fields.password; // Con esto borramos ciertos campos del objeto por unos momentos.


        const roleUpdated = await Role.findByIdAndUpdate( uid, fields, { new: true } );
        // con { new: true } mongoose me devuelve el nuevo resultado de manera inmediata

        res.json({
            ok: true,
            role: roleUpdated
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        });
    }
};

const deleteRole = async (req, res = response) => {
    const uid = req.params.id;

    try {

        const roleDB = await Role.findById( uid );

        if ( !roleDB ) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un usuario por ese id'
            });
        }

        await Role.findByIdAndDelete( uid );

        res.json({
            ok: true,
            msg: 'Role eliminado'
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        })
    }
};


module.exports = {
    getRoles,
    getRole,
    createRole,
    updateRole,
    deleteRole
};