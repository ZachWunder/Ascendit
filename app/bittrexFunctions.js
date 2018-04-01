const readBittrex = require('node-readBittrex-api');
const secrets = require('./secrets')
readBittrex.options(secrets)

module.exports = {

    balance: function(currency) { 
        return new promise((resolve, reject) => { 
            readBittrex.getbalance({ currency : currency }, function( data, err ) {
                if (err) { reject(err) }
                else { resolve(data.result) } 
            })
        })
    },
    
    askPrice: function(currency) {
        return new Promise((resolve, reject) => {
            readBittrex.getorderbook({ market : 'USDT-ADA', type : 'sell' }, (data, err) => {
                if (err) { reject(err) }
                else { resolve(data.result[0].Rate) }  
            })
        })         
    },
    
    bidPrice: function(currency) {
        return new Promise((resolve, reject) => {
            readBittrex.getorderbook({ market : 'USDT-ADA', type : 'buy' }, (data, err) => {
                if (err) { reject(err) }
                else { resolve(data.result[0].Rate) }
            })
        })         
    }
}
