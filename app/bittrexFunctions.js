const bittrex = require('node-bittrex-api');
const secrets = require('./secrets')
bittrex.options(secrets)

module.exports = {

    balance: function(currency, callback) { 
        return new promise((resolve, reject) => { 
            bittrex.getbalance({ currency : currency }, function( data, err ) {
                if (err) { reject(err) }
                else { resolve(data.result) } 
            })
        })
    },
    
    askPrice: function(currency) {
        return new Promise((resolve, reject) => {
            bittrex.getorderbook({ market : 'USDT-ADA', type : 'sell' }, (data, err) => {
                if (err) { reject(err) }
                else { resolve(data.result[0].Rate) }  
            })
        })         
    },
    
    bidPrice: function(currency) {
        return new Promise((resolve, reject) => {
            bittrex.getorderbook({ market : 'USDT-ADA', type : 'buy' }, (data, err) => {
                if (err) { reject(err) }
                else { resolve(data.result[0].Rate) }
            })
        })         
    }
}
