const Crypto = require('crypto');
const uuidv4 = require('uuid/v4')

const defaultOptions = {
    header: {
        typ: 'JWT',
        alg: 'HS512'
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
        self.signature = null;
        self.secret = config.secret
        self.token = null;
        
    }

    sign (header, payload, alg, secret) {       
        const headerString = _base64EncodeObject(header);
        const payloadString = _base64EncodeObject(payload);
        const signature = _getSignature(headerString, payloadString, header.alg, secret);//hmac.digest('base64');
        self.token = `${self.headerString}.${self.payloadString}.${self.signature}`;
    }
    
    static verify(token, secret) {
        let parts = token.split('.');
        let signature = parts[2];
        const header = _base64StringToUTF8(parts[0]);
        const incommingSignature = _getSignature(parts[0], parts[1], header.alg, secret);
        return signature === incommingSignature;
    }

    static generateRandomSecret (numRuns = 5) {
        let secret = '';
        for(let i = 0; i < numRuns; i++){
            secret += uuidv4();
        }
        return secret.replace('-', '');
    }

    _getHmac (alg, secret) {
        let hmac = null;
        if (alg === 'HS256') {
            hmac = Crypto.createHmac('sha256', secret);
        } else if (alg === 'HS512') {
            hmac = Crypto.createHmac('sha512', secret);
        } else {
            hmac = Crypto.createHmac(alg, secret)
        }
        if(hmac === null) {
            throw `${alg} is not a supported algorythm!`;
        }
        return hmac;
    }

    _getSignature (base64Header, base64Payload, alg, secret) {
        let hmac = _getHmac(header.alg, secret); 
        hmac.update(`${headerString}.${payloadString}`);
        return hmac.digest('base64');
    }

    _base64EncodeObject (obj) {
        return _base64EncodeString(JSON.stringify(obj));
    }

    _base64EncodeString (str) {
        return new Buffer(str, 'utf8').toString('base64');
    }

    _base64StringToUTF8 (str) {
        return new Buffer(str, 'base64').toString('utf8');
    }


}