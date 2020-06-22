export const environment = {
  apiBaseURI: 'https://vastforce.herokuapp.com/api',
  authConfig: {
    clientID: '2EHHIox2_2t01td8HfxYNpSuEZAVwLpH',
    domain: 'brewkeeper.auth0.com',
    responseType: 'token id_token',
    redirectUri: 'https://brewkeeper.herokuapp.com/callback',
    scope: 'openid profile'
  },
  production: true
};
