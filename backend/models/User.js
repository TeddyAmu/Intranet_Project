const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    gender: String,
    firstname: String,
    lastname: String,
    email: { type: String, unique: true },
    password: String,
    phone: String,
    birthdate: Date,
    city: String,
    country: String,
    photo: String,
    category: String,
    isAdmin: Boolean
});

userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

module.exports = mongoose.model('User', userSchema);
