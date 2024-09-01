const express = require('express');
const dotenv = require('dotenv');
const session = require('express-session')

dotenv.config();
const authRoutes = require('./routes/calendlyauthRoutes');
const userRoutes = require('./routes/calendlyuserRoutes');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
  }));
  

app.use('/calendlyAuth', authRoutes);
app.use('/calendlyUser', userRoutes)


// Start the Express server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

