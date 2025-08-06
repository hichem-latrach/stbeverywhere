const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');

dotenv.config();

const app = express();
const db = require('./db');

db.query('SELECT 1')
  .then(() => console.log('✅ MySQL connected'))
  .catch(err => console.error('❌ MySQL connection failed:', err));
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
