require('dotenv').config(); // Manejos de variables de entorno a nivel de aplicacion

const express = require('express');
const cors = require('cors'); // Con esto manejamos CORS

const { dbConnection } = require('./database/config');

// Crear el servidor express
const app = express();

// Configurar CORS
app.use( cors() ); // <= Esto es un middleware

// Lectura y parseo del body
app.use( express.json() );

// Base de datos;
dbConnection();

// console.log(process.env); // Listamos todos los procesos internos

// Rutas
app.use( '/api/users', require('./routes/user-routes') );
app.use( '/api/login', require('./routes/auth-routes') );
app.use( '/api/roles', require('./routes/role-routes') );
app.use( '/api/lookupCodeGroups', require('./routes/lookupCodeGroup-routes') );
app.use( '/api/lookupCodes', require('./routes/lookupCode-routes') );
app.use( '/api/sunat', require('./routes/sunat-routes') );
app.use( '/api/companies', require('./routes/company-routes') );
app.use( '/api/complements', require('./routes/complement-routes') );
app.use( '/api/drivers', require('./routes/driver-routes') );
app.use( '/api/vehicles', require('./routes/vehicle-routes') );
app.use( '/api/points', require('./routes/point-routes') );
app.use( '/api/search', require('./routes/search-routes') );
app.use( '/api/upload', require('./routes/upload-routes') );
app.use( '/api/userCompany', require('./routes/userCompany-routes') );
app.use( '/api/userRoles', require('./routes/userRole-routes') );
app.use( '/api/userDetail', require('./routes/userDetail-routes') );

app.listen(process.env.PORT, () => {
    console.log( 'Servidor corriendo en puerto ' + process.env.PORT );
});
