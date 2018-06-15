// *** Create new orders and replace ID's in DB *** //
const secrets = require('./secrets/realSecrets');

const ccxt = require('ccxt');
const bittrex = new ccxt.bittrex()
bittrex.apiKey = secrets.key;
bittrex.apiSecret = secrets.secret;

const execute = (params) => {
    
}
