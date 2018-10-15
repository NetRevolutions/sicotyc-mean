const express = require('express');
const app = express();

app.use('/api',require('./api'));
// Here to add more routes

module.exports = app;