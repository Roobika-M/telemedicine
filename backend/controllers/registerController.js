const { saveUser } = require('../models/userModel');

function handleRegister(req, res) {
  try {
    const userData = req.body;

    if (!userData.name || !userData.phone || !userData.role) {
      return res.status(400).json({ success: false, message: 'Missing required fields' });
    }

    const savedUser = saveUser(userData);

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: savedUser,
    });
  } catch (err) {
    console.error('Register error:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
}

module.exports = { handleRegister };
