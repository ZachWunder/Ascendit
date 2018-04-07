const readBittrex = require('node-bittrex-api');
const secrets = require('./secrets')
readBittrex.options(readSecrets)
accountBittrex.options(accountSecrets)

module.exports = {

    balance : async currency => {
        return new Promise((resolve, reject) => {
            readBittrex.getbalance({ currency : currency }, function( data, err ) {
                if (err) { reject(err) }
                else { resolve(data.result) }
            })
        })
    },


    sell : async function (market, quantity, price) {
        const url = 'https://bittrex.com/api/v1.1/market/selllimit?market=' + market + '&quantity=' + quantity + '&rate=' + price;
        readBittrex.sendCustomRequest(url, (data, err) => {
            return new Promise((resolve, reject) => {
                if (err) { reject(err) }
                else { resolve(data.result.uuid) }
            })
        })
    },

    buy : async function (market, quantity, price) {
        const url = 'https://bittrex.com/api/v1.1/market/buylimit?market=' + market + '&quantity=' + quantity + '&rate=' + price;
        readBittrex.sendCustomRequest(url, (data, err) => {
            return new Promise((resolve, reject) => {
                if (err) { reject(err) }
                else { resolve(data.result.uuid) }
            })
        })
    },

    askPrice : async function (currency) {
        return new Promise((resolve, reject) => {
            readBittrex.getorderbook({ market : 'USDT-ADA', type : 'sell' }, (data, err) => {
                if (err) { reject(err) }
                else { resolve(data.result[0].Rate) }
            })
        })
    },

    bidPrice : async function (currency) {
        return new Promise((resolve, reject) => {
            readBittrex.getorderbook({ market : 'USDT-ADA', type : 'buy' }, (data, err) => {
                if (err) { reject(err) }
                else { resolve(data.result[0].Rate) }
            })
        })
    }
}
