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


app.listen(process.env.PORT, () => {
    console.log( 'Servidor corriendo en puerto ' + process.env.PORT );
});