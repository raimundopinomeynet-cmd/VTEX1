const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const brandCheckerRoutes = require('./routes/brandChecker');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

// Routes
app.use('/api', brandCheckerRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Brand SEO ChatGPT Checker API is running' });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Servidor ejecutándose en http://localhost:${PORT}`);
  console.log(`📊 API disponible en http://localhost:${PORT}/api`);
});
