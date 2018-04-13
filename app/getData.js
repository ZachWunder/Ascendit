const readBittrex = require('node-bittrex-api');
const readSecrets = require('./readSecrets');
const EMA = require('technicalindicators').EMA;
const fns = require('./bittrexFunctions');
readBittrex.options(readSecrets)

async function candles () {
  readBittrex.getcandles(
  {marketName: 'USDT-ADA',
   tickInterval: 'fiveMin'},
   (data, err) => {
     return new Promise((resolve, reject) => {
       console.log(data)
       if (err || data === undefined) { reject(err) }
       else { resolve(data.result.slice(data.length - 12 , data.length)) }
     })
    })
}

async function EMASlope(values) {
  const period = 12
  const average = EMA.calculate({period: period, values: values})
  return new Promise((resolve, reject) => {
    console.log(average)
    if (average === null || average === undefined) {reject('empty')}
    else { resolve(average) }
  })
}

async function wrapper() {
  try {
    let values = await candles()
    return values
    //console.log(values)
    //let emavalues = await EMASlope(values)
    //return emavalues
  }
  catch (error) {
    console.log(error)
    throw error
  }
}

wrapper().then(result => {
  console.log(result)
}).catch(err => {
  console.log(err)
})
