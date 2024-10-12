// CORE MODULES
const path = require('path');

// IMPORTS
const express = require('express');
const app = express();
const cors = require('cors');
const connDB = require('./config/conDB')
const mongoose = require('mongoose');
const corsOptions = require('./config/corsOptions');

const port = process.env.port || 3500;

connDB();

// Middlewares
app.use(cors(corsOptions)); // Add Cors Options
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// Public routes
app.use('/', require('./routes/root'));


// Error handler
app.use('*', (req, res) => {
  res.status(404);
  if(req.accepts('html')) {
    res.sendFile(path.join(__dirname, 'view', 'NotFound.html'));
  } else if(req.accepts('json')) {
    res.json({"message": "404 Not Found"})
  } else {
    res.type('txt').send('404 Not Found');
  }
});


// Runnner
mongoose.connection.once('open', () => {
  console.log('connected to DB');
  app.listen(port, () => console.log(`server is running in port ${port}`));
})
