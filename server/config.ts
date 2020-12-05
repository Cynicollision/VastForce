import { AppConfig, EnvType } from './core/core';

export const config: AppConfig = {
    envType: process.env.NODE_ENV || EnvType.Development,
    port: process.env.PORT,
    clientUrl: 'http://localhost:4200',
    authConfig: {
        authClientID: 'FGnxJkAuROymM8pbg9IBz37KKG0xSMgs', // TODO: get Auth Client ID from process.env
        authJwksUri: 'https://stn-dev.us.auth0.com/.well-known/jwks.json',
        authUri: 'https://stn-dev.us.auth0.com/',
    },
    auth0CallbackUrl: process.env.AUTHO_URI || 'http://localhost:3000/oauth2/callback',
    dbConfig: {
        mongoUri: process.env.MONGODB_URI || 'mongodb://localdev:l0cald3v@localhost:27017/vastforce', // TODO: should be part of env setup
    },
};
