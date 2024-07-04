const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoutes = require('./routes/auth');

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: true
}));

mongoose.connect('mongodb://localhost:27017/projet-collaborateurs', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.use('/api/auth', authRoutes);

module.exports = app;
