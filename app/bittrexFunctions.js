const readBittrex = require('node-bittrex-api');
const readSecrets = require('./readSecrets')
readBittrex.options(readSecrets)
//marketBittrex.options(marketSecrets)
//accountBittrex.options(accountSecrets)

module.exports = {

    currentSpread: async (currency) => {
      return new Promise((resolve, reject) => {
        readBittrex.getticker({ market : 'USDT-ADA'}, (data, err) => {
            if (err) { reject(err) }
            else {
              const spread = (1 - (data.result.Bid / data.result.Ask)) * 100
              resolve(spread)
            }
        })
      })
    },

    balance : async currency => {
        return new Promise((resolve, reject) => {
            accountBittrex.getbalance({ currency : currency }, function( data, err ) {
                if (err) { reject(err) }
                else { resolve(data.result) }
            })
        })
    },


    sell : async function (market, quantity, price) {
        const url = 'https://bittrex.com/api/v1.1/market/selllimit?market=' + market + '&quantity=' + quantity + '&rate=' + price;
        marketBittrex.sendCustomRequest(url, (data, err) => {
            return new Promise((resolve, reject) => {
                if (err) { reject(err) }
                else { resolve(data.result.uuid) }
            })
        })
    },

    buy : async function (market, quantity, price) {
        const url = 'https://bittrex.com/api/v1.1/market/buylimit?market=' + market + '&quantity=' + quantity + '&rate=' + price;
        marketBittrex.sendCustomRequest(url, (data, err) => {
            return new Promise((resolve, reject) => {
                if (err) { reject(err) }
                else { resolve(data.result.uuid) }
            })
        })
    },

    askPrice : async function (currency) {
        return new Promise((resolve, reject) => {
            readBittrex.getticker({ market : 'USDT-ADA'}, (data, err) => {
                if (err) { reject(err) }
                else { resolve(data.result.Ask) }
            })
        })
    },

    bidPrice : async function (currency) {
        return new Promise((resolve, reject) => {
            readBittrex.getticker({ market : 'USDT-ADA'}, (data, err) => {
                if (err) { reject(err) }
                else { resolve(data.result.Bid) }
            })
        })
    }
}
