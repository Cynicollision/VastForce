export class Config {
    static readonly authClientID = '2EHHIox2_2t01td8HfxYNpSuEZAVwLpH';
    static readonly authJwksUri = 'https://brewkeeper.auth0.com/.well-known/jwks.json';
    static readonly authUri = 'https://brewkeeper.auth0.com/';
    static readonly mongo = process.env.MONGODB_URI || 'mongodb://localdev:l0cald3v@localhost:27017/brewkeeper'
    static readonly dev = (process.env.NODE_ENV || 'development') === 'development';
    static readonly port = process.env.PORT || '3000';
}