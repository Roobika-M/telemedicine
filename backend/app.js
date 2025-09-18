const express = require('express');
const cors = require('cors');
const registerRoutes = require('./routes/register');

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Parse JSON body

// Routes
app.use('/api/register', registerRoutes);

// Health check route
app.get('/', (req, res) => {
  res.send('TeleMed Backend API is running ✅');
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
