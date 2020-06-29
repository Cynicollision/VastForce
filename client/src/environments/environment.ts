// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const Environment = {
  apiBaseURI: 'http://localhost:3000/api',
  authConfig: {
    clientID: 'FGnxJkAuROymM8pbg9IBz37KKG0xSMgs',
    domain: 'stn-dev.us.auth0.com',
    responseType: 'token id_token',
    redirectUri: 'http://localhost:4200/callback',
    scope: 'openid profile'
  },
  production: false,
};
