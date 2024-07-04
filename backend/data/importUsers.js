const mongoose = require('mongoose');
const User = require('../models/User');
const usersData = require('./users.json');

mongoose.connect('mongodb://localhost:27017/projet-collaborateurs', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(async () => {
    await User.deleteMany({});
    await User.insertMany(usersData);
    console.log('Users imported');
    mongoose.connection.close();
}).catch(err => {
    console.error(err);
});
