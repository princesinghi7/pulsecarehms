const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// Load env vars
dotenv.config();

const app = express();

// Body parser
app.use(express.json());

// Enable CORS
app.use(cors());

// Mount routers
// app.use('/api/v1/auth', require('./routes/auth'));

// Define PORT
const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
  res.send('PulseCare HMS API is running...');
});

// Connect to Database
mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/pulsecarehms')
  .then(() => {
    console.log('MongoDB Connected...');
    const server = app.listen(PORT, console.log(`Server running on port ${PORT}`));
  })
  .catch(err => console.log('DB Connection Error:', err));
