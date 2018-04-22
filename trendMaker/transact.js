const fns = require('app/bittrexFunctions')
const fs = require('fs')

async function sellAtAsk (currency, positionSize, spread) {
  const ask = await fns.askPrice(currency);
  const balance = await fns.balance(currency);

  const quantity = balance * positionSize
  const price = ask + (spread / 2)

  const orderUUID = await fns.sell('USDT-ADA', quantity, price);
  fs.writeFile('openSellOrders.txt', orderUUID + '\n', {'flag' : 'a'},
                (err) => { if (err) throw err });
}

async function buyAtBid (positionSize, spread) {
  const bid = await fns.bidPrice(currency);
  const balance = await fns.balance('USDT');

  const quantity = balance * positionSize
  const price = bid + (spread / 2)

  const orderUUID = await fns.sell('USDT-ADA', quantity, bid);
  fs.watchFile('openBuyOrders.txt', orderUUID + '\n', {'flag' : 'a'},
                (err) => { if (err) throw err });
}
