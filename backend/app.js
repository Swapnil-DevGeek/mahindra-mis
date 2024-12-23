const express = require('express');
const morgan = require('morgan'); // For logging
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const colors = require('colors'); 
const cors = require('cors');
const bodyParser = require('body-parser');

dotenv.config();
connectDB();

const app = express();

app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/projects', require('./routes/projectRoutes'));
app.use('/api/activities',require('./routes/activityRoutes'));
app.use('/api/parts', require('./routes/partRoutes'));
app.use('/api/part-activities', require('./routes/partActivityRoutes'));

module.exports = app;
