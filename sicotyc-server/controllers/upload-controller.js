const path = require('path');
const fs = require('fs');

const { response } = require("express");
const { v4: uuidv4 } = require('uuid');
const { updateImage } = require("../helpers/update-image");


const fileUpload = async( req, res = response ) => {

    const type = req.params.type;
    const id = req.params.id;

    // Validar tipo
    const validTypes = ['complements', 'drivers', 'users', 'vehicles'];
    if ( !validTypes.includes(type) ) {
        return res.status(400).json({
            ok: false,
            msg: 'No es un complemento, conductor, usuario o vehiculo (tipo)'
        });
    }

    // Validar que exista un archivo
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok: false,
            msg: 'No hay ningun archivo'
        });
    }

    // Procesar la imagen...
    const file = req.files.img;

    const nameBroken = file.name.split('.'); // wolverine.1.3.jpg
    const extensionFile = nameBroken[nameBroken.length - 1];

    // Validar extension
    const validExtension = ['png', 'jpg', 'jpeg', 'gif'];
    if ( !validExtension.includes(extensionFile) ) {
        return res.status(400).json({
            ok: false,
            msg: 'No es una extension permitida'
        });
    }

    // Generar nombre del archivo
    const fileName = `${ uuidv4() }.${ extensionFile }`;

    // Path para guardar la imagen
    const path = `./uploads/${ type }/${ fileName }`;

    // Mover la imagen    
    file.mv(path, (err) => {
        if (err){
            console.log(error);
            return res.status(500).json({
                ok: false,
                msg: 'Error al mover la imagen'
            });
        }        
        
        // Actualizar base de datos
        updateImage( type, id, fileName );

        res.json({
            ok: true,
            msg: 'archivo subido',
            fileName            
        });
    });    
};

const returnImage = async( req, res = response ) => {
    const type = req.params.type;
    const photo = req.params.photo;

    const pathImg = path.join( __dirname, `../uploads/${ type }/${ photo }` );

    // Imagen por defecto
    if (fs.existsSync( pathImg )) {
        res.sendFile( pathImg );
    } else {
        const pathImg = path.join( __dirname, `../uploads/imagen-no-disponible.png` );
        res.sendFile( pathImg );
    }    
};

module.exports = {
    fileUpload,
    returnImage
};