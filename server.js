// CORE MODULES
const path = require('path');

// IMPORTS
const express = require('express');
const app = express();
const cors = require('cors');
const connDB = require('./config/conDB')
const mongoose = require('mongoose');
const corsOptions = require('./config/corsOptions');
const cookieParser = require('cookie-parser');

const port = process.env.port || 3500;

connDB();

// Middlewares
app.use(cors(corsOptions)); // Add Cors Options
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// Public routes
app.use('/', require('./routes/root'));

// User Routes
app.use('/register', require('./routes/user/register'));
app.use('/login', require('./routes/user/login'));
app.use('/refresh', require('./routes/user/refresh'));
app.use('/logout', require('./routes/user/logout'));

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
