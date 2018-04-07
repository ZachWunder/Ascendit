const fns = require('./bittrexFunctions')
const fs = require('fs')
const EMA = require('technicalindicators').EMA

function sellAtAsk (currency, positionSize, spread) {
  const ask = await fns.askPrice(currency)
  const balance = await fns.balance(currency)

  const quantity = balance * positionSize
  const price = ask + (spread / 2)

  const orderUUID = await fns.sell('USDT-ADA', quantity, ask)
  fs.writeFile('openOrders.txt', orderUUID + '\n', {'flag' : 'a'}, (err) => { if (err) throw err })

}
