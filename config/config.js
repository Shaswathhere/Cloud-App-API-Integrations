module.exports = {
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    calendlyClientId: process.env.CALENDLY_CLIENT_ID,
    calendlyClientSecret: process.env.CALENDLY_CLIENT_SECRET,
    calendlyRedirectUri: process.env.CALENDLY_REDIRECT_URI,
    dropboxRedirectUri: process.env.DROPBOX_REDIRECT_URI,
    dropboxClientId: process.env.DROPBOX_CLIENT_ID,
    dropboxSecret: process.env.DROPBOX_CLIENT_SECRET,
    githubClientId: process.env.GITHUB_CLIENT_ID,
    githubSecret: process.env.GITHUB_CLIENT_SECRET,
    githubRedirectUri: process.env.GITHUB_REDIRECT_URI,
    dropboxAuthUrl: 'https://www.dropbox.com/oauth2/authorize',
    dropboxTokenUrl: 'https://api.dropboxapi.com/oauth2/token',
    calendlyApiUrl: 'https://api.calendly.com',
    calendlyAuthUrl: 'https://auth.calendly.com/oauth/authorize',
    calendlyTokenUrl: 'https://auth.calendly.com/oauth/token',
    githubAuthUrl: 'https://github.com/login/oauth/authorize',
    githubTokenUrl: 'https://github.com/login/oauth/access_token',
    githubOrgName: 'shaswathhere7'
  };
  