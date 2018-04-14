const readBittrex = require('node-bittrex-api');
const readSecrets = require('./readSecrets');
const EMA = require('technicalindicators').EMA;
const fns = require('./bittrexFunctions');
readBittrex.options(readSecrets)

async function candles (period) {
   return new Promise((resolve, reject) => {
     readBittrex.getcandles(
       {marketName: 'USDT-ADA', tickInterval: 'thirtyMin'},
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
    const period = 12
    let average = EMA.calculate({period: period, values: values})
    if (average === null || average === undefined) {reject('empty')}
    else { resolve(average) }
  })
}

modules.export = {
  test: async function () {
    try {
      let values = await candles()
      let emavalues = await EMASlope(values)
      return emavalues
    }
    catch (error) {
      console.log(error)
      throw error
    }
  }
}
