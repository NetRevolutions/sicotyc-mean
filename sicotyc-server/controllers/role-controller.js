const { response } = require('express'); // Con esto hacemos que el response traiga todas su propiedades.
const Role = require('../models/role');


const getRoles = async(req, res) => {

    const roles = await Role.find();
    //const roles = await Role.find({}, 'roleName'); // Tambien se puede aplicar filtros

    res.json({
        ok: true,
        roles
    });
};

const createRole = async(req, res = response) => {
    
    const { roleName } = req.body;

    try {
        const existRole = await Role.findOne({ roleName });

        if (existRole) {
            return res.status(400).json({
                ok: false,
                msg: 'El role ya se encuentra registrado'
            });
        }

        const role = new Role( req.body );
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
    createRole,
    updateRole,
    deleteRole
};