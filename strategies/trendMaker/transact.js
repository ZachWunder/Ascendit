const fns = require('app/bittrexFunctions')


async function sellAtAsk (currency, positionSize, spread) {
  const ask = await fns.askPrice(currency);
  const balance = await fns.balance(currency);

  const quantity = balance * positionSize
  const price = ask + (spread / 2)

  const orderUUID = await fns.sell('USDT-ADA', quantity, price);
  return new Promise ( (resolve, reject) => {
    if (orderUUID)
      resolve(orderUUID)
    else {
      reject('error')
}

async function buyAtBid (positionSize, spread) {
  const bid = await fns.bidPrice(currency);
  const balance = await fns.balance('USDT');

  const quantity = balance * positionSize
  const price = bid + (spread / 2)

  const orderUUID = await fns.sell('USDT-ADA', quantity, bid);

  return new Promise ( (resolve, reject) => {
    if (orderUUID)
      resolve(orderUUID)
    else {
      reject('error')
    }
  })
}

async updateOrders (strategyObject) {
  let buyOrder = await getOrder(strategyObject.orders.buy)
  let sellOrder = await getOrder(strategyObject.orders.sell)
  return new Promise( (resolve, reject) => {
    if (buyOrder.Quantity == 0 && sellOrder.Quantity == 0)
      resolve('both')
    else if (sellOrder.Quantity == 0)
      resolve('sell')
    else if (buyOrder.Quantity == 0)
      resolve('buy')
    else
      resolve('none')

  })
}
