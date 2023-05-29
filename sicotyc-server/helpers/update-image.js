const fs = require('fs');

const Complement = require('../models/complement');
const Driver = require('../models/driver');
const User = require('../models/user');
const Vehicle = require('../models/vehicle');

const deleteImage = ( path ) => {
    if ( fs.existsSync( path ) ) {
        // borrar la imagen anterior        
        fs.unlinkSync( path );
    }
}

const updateImage = async (type, id, fileName) => {

    switch (type) {
        case 'complements':
            const complement = await Complement.findById(id)
            if ( !complement ) {
                console.log('No es un complemento por id');
                return false;
            }

            const oldPathComplement = `./uploads/complements/${ complement.imagePath }`;
            deleteImage( oldPathComplement );

            complement.imagePath = fileName;
            await complement.save();
            
        break;

        case 'drivers':
            const driver = await Driver.findById(id);
            if( !driver ) {
                console.log('No es un driver por id');
                return false;
            }

            const oldPathDriver = `./uploads/drivers/${ driver.imagePath }`;
            deleteImage( oldPathDriver );

            driver.imagePath = fileName;
            await driver.save();

        break;

        case 'users':
            const user = await User.findById(id);
            if ( !user ) {
                console.log('No es un user por id');
                return false;
            }

            const oldPathUser = `./uploads/users/${ user.imagePath }`;
            deleteImage( oldPathUser );

            user.imagePath = fileName;
            await user.save();

        break;

        case 'vehicles':
            const vehicle = await Vehicle.findById(id);
            if ( !vehicle ) {
                console.log('No es un vehiculo por id');
                return false;
            }

            const oldPathVehicle = `./uploads/vehicles/${ vehicle.imagePath }`;
            deleteImage( oldPathVehicle );

            vehicle.imagePath = fileName;
            await vehicle.save();

        break;        
    }

};



module.exports = {
    updateImage
}