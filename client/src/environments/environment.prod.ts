export const environment = {
  apiBaseURI: 'https://vastforce.herokuapp.com/api',
  authConfig: {
    clientID: 'FGnxJkAuROymM8pbg9IBz37KKG0xSMgs',
    domain: 'stn-dev.us.auth0.com',
    responseType: 'token id_token',
    redirectUri: 'https://vastforce.herokuapp.com/callback',
    scope: 'openid profile'
  },
  production: true
};
