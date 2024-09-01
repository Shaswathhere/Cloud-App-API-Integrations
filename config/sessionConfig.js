module.exports = {
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    clientId: process.env.CALENDLY_CLIENT_ID,
    clientSecret: process.env.CALENDLY_CLIENT_SECRET,
    redirectUri: process.env.REDIRECT_URI,
    calendlyApiUrl: 'https://api.calendly.com',
    calendlyAuthUrl: 'https://auth.calendly.com/oauth/authorize',
    calendlyTokenUrl: 'https://auth.calendly.com/oauth/token',
  };
  