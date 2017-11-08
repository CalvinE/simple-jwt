const Crypto = require('crypto');
// const uuid = require('uuid/v4')

const defaultOptions = {
    header: {
        typ: 'JWT',
        alg: 'HS256'
    },
    payload: {
        iss: undefined,
        exp: undefined,
        nbf: undefined,
        sub: undefined,
        aud: undefined
    }
};

class JWT {
    constructor (config) {
        self.header = Object.assign({}, config.header, defaultOptions.header);
        self.payload = Object.assign({}, config.payload, defaultOptions.payload);
        self.secret = config.secret
        self.token = null;
        
    }

    sign (alg, secret) {
        let hmac = null;
        if (self.header.alg === 'HS256') {
            hmac = Crypto.createHmac('sha256', secret);
        } else if (self.header.alg === 'HS512') {
            hmac = Crypto.createHmac('sha512', secret);
        }
        const headerString = new Buffer(JSON.stringify(self.header)).toString('base64');
        const payloadString = new Buffer(JSON.stringify(self.payload)).toString('base64');


    }

    static verify(token, secret) {

    }


}