export class Config {
    static readonly appName = 'VastForce';
    static readonly isDev = (process.env.NODE_ENV || 'development') === 'development';
    static readonly port = process.env.PORT || '3000';
    static readonly authClientID = 'FGnxJkAuROymM8pbg9IBz37KKG0xSMgs';
    static readonly authJwksUri = 'https://stn-dev.us.auth0.com/.well-known/jwks.json';
    static readonly authUri = 'https://stn-dev.us.auth0.com/';
    static readonly mongoUri = process.env.MONGODB_URI || 'mongodb://localdev:l0cald3v@localhost:27017/vastforce'
}