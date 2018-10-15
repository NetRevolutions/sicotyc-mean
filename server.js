// Get Config
require("./server/config/config");


// Get Dependencies
const express = require('express');
const path = require('path');
const http = require('http');
const mongoose = require('mongoose');

const app = express();
const bodyParser = require("body-parser");

// Parser for POST data
app.use(bodyParser.json());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// Point static path to dist
app.use(express.static(path.join(__dirname, "dist")));

// Set out api routes
app.use(require('./server/routes/index'));

// Catch all other routes and return to index file
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
});


/**
 * Create MongoDB connection.
 */

mongoose.connect(process.env.URLDB, {
    useNewUrlParser: true,
    useCreateIndex: true
    },
    (err, res)=>{
        if (err) throw err;

        console.log('Base de datos ONLINE');
    }
);

 /**
  * Create HTTP server.
  */
 const server = http.createServer(app);

 /**
  * Listen on provided port, on all network interfaces.
  */

server.listen(process.env.PORT, () => console.log(`API running on localhost:${process.env.PORT}`));
