require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

// Connect Database
connectDB();

const app = express();
app.use(express.json());
// Configure CORS
app.use(cors({
  origin: '*', // Allow all origins for production ease, can be restricted later
  credentials: true
}));

// Define routes
app.get('/', (req, res) => res.send('API is running...'));
app.use('/api/auth', require('./routes/auth'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
