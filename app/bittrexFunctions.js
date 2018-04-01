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
    
    sell: function (market, quantity, price) {
        const url = 'https://bittrex.com/api/v1.1/market/buylimit?market=' + market + '&quantity=' + quantity + '&rate=' + price;
        readBittrex.sendCustomRequest(url, (data, err) => {
            return new Promise((resolve, reject) => {
                if (err) { reject(err) }
                else { resolve(data.result.uuid) }  
            })
        })
    },    
    
    askPrice: function (currency) {
        return new Promise((resolve, reject) => {
            readBittrex.getorderbook({ market : 'USDT-ADA', type : 'sell' }, (data, err) => {
                if (err) { reject(err) }
                else { resolve(data.result[0].Rate) }  
            })
        })         
    },
    
    bidPrice: function (currency) {
        return new Promise((resolve, reject) => {
            readBittrex.getorderbook({ market : 'USDT-ADA', type : 'buy' }, (data, err) => {
                if (err) { reject(err) }
                else { resolve(data.result[0].Rate) }
            })
        })         
    }
}
