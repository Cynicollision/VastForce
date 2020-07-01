import { AppConfig } from './app-server';
import { EnvType } from './enum/env-type';

export const config: AppConfig= {
    envType: process.env.NODE_ENV || EnvType.Development,
    port: process.env.PORT,
    authConfig: {
        authClientID: 'FGnxJkAuROymM8pbg9IBz37KKG0xSMgs', // TODO: get Auth Client ID from process.env
        authJwksUri: 'https://stn-dev.us.auth0.com/.well-known/jwks.json',
        authUri: 'https://stn-dev.us.auth0.com/',
    },
    dbConfig: {
        mongoUri: process.env.MONGODB_URI || 'mongodb://localdev:l0cald3v@localhost:27017/vastforce', // TODO: should be part of env setup
    },
};
