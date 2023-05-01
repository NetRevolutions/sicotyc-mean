require('dotenv').config(); // Manejos de variables de entorno a nivel de aplicacion

const express = require('express');
const cors = require('cors'); // Con esto manejamos CORS

const { dbConnection} = require('./database/config');

// Crear el servidor express
const app = express();

// Configurar CORS
app.use(cors()); // <= Esto es un middleware

// Base de datos;
dbConnection();

// console.log(process.env); // Listamos todos los procesos internos

// Rutas
app.get( '/', (req, res) => {
    res.json({
        ok: true,
        msg: 'Hola Mundo'
    });
});


app.listen(process.env.PORT, () => {
    console.log('Servidor corriendo en puerto ' + process.env.PORT);
});
