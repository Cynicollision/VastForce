export class Config {
    static readonly authClientID = 'FGnxJkAuROymM8pbg9IBz37KKG0xSMgs';
    static readonly authJwksUri = 'https://stn-dev.us.auth0.com/.well-known/jwks.json';
    static readonly authUri = 'https://stn-dev.us.auth0.com/';
    static readonly mongo = process.env.MONGODB_URI || 'mongodb://localdev:l0cald3v@localhost:27017/vastforce'
    static readonly dev = (process.env.NODE_ENV || 'development') === 'development';
    static readonly port = process.env.PORT || '3000';
}