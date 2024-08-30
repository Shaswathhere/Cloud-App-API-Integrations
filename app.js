const express = require('express');
const dotenv = require('dotenv');
const session = require('express-session');

dotenv.config();

const sessionConfig = require('./config/sessionConfig.js');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();

// Middleware to handle sessions
app.use(session(sessionConfig));

// Routes
app.use('/auth/calendly', authRoutes);
app.use('/calendly/users', userRoutes);

// Start the Express server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
