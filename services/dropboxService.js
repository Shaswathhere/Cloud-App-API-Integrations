const OAuthService = require('./OAuthService');
const config = require('../config/config');


class DropBpxService extends OAuthService{
    constructor(){
        super({
            clientId: config.dropboxClientId,
            clientSecret: config.dropboxSecret,
            redirectUri: config.dropboxRedirectUri,
            authUrl: config.dropboxAuthUrl,
            tokenUrl: config.dropboxTokenUrl,
        })
    }

}

module.exports = new DropBpxService();