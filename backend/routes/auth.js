const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const router = express.Router();

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
        return res.status(400).json({ message: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(400).json({ message: 'Invalid email or password' });
    }

    req.session.user = user;
    res.status(200).json({ message: 'Login successful' });
});

router.post('/logout', (req, res) => {
    req.session.destroy();
    res.status(200).json({ message: 'Logout successful' });
});

router.get('/random-collaborator', async (req, res) => {
    const count = await User.countDocuments();
    const random = Math.floor(Math.random() * count);
    const user = await User.findOne().skip(random);
    res.json(user);
});

module.exports = router;
