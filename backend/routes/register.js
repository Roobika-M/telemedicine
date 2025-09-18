const express = require('express');
const { handleRegister } = require('../controllers/registerController');

const router = express.Router();

// POST /api/register
router.post('/', handleRegister);

module.exports = router;
