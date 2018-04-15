const readBittrex = require('node-bittrex-api');
const readSecrets = require('./readSecrets');
const EMA = require('technicalindicators').EMA;
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

async function EMASlope(period, values) {
  return new Promise((resolve, reject) => {
    let average = EMA.calculate({period: period, values: values})
    if (average === null || average === undefined) {reject('empty')}
    else { resolve(average) }
  })
}

module.exports = {
  ema: async function (period) {
    try {
      let values = await candles(period)
      let emavalues = await EMASlope(period, values)
      console.log(emavalues)
      return emavalues
    }
    catch (error) {
      throw error
    }
  }
}
