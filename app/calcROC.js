const readBittrex = require('node-bittrex-api');
const readSecrets = require('./readSecrets');
const roc = require('technicalindicators').ROC;
const fns = require('./bittrexFunctions');
readBittrex.options(readSecrets)

async function candles (period) {
   return new Promise((resolve, reject) => {
     readBittrex.getcandles(
       {marketName: 'USDT-ADA', tickInterval: 'fiveMin'},
       (data, err) => {
         if (err) { reject(err) }
         else {
           let retrievedCandles = data.result.slice(data.result.length - period)
           let values = []
           for (let i = 0; i < retrievedCandles.length; i++) {
             values.push(retrievedCandles[i].C)
           }
           resolve(values)}
       })
     })
}

async function ROC(period, values) {
  return new Promise((resolve, reject) => {
    let average = roc.calculate({period: 1, values: values})
    if (average === null || average === undefined) {reject('empty')}
    else { resolve(average) }
  })
}

module.exports = {
  ROC: async function (period) {
    try {
      let values = await candles(period)
      console.log(values)
      let ROCvalues = await ROC(period, values)
      return ROCvalues
    }
    catch (error) {
      throw error
    }
  }
}
