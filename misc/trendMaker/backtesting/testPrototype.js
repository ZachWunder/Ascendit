const ccxt = require('ccxt')

const getOrder = require('./bittrexFunctions.js').getOrder
//const buyAtBid = require('./transact').buyAtBid
const buyAtBid = (amount, price, accountObject) => {
    //price -= spread / 2
    accountObject.ADA += amount
    accountObject.USDT -= amount * (price - (price * .02))
    return accountObject
}
//const sellAtAsk = require('./transact').sellAtAsk
const sellAtAsk = (amount, price, accountObject) => {
    //price += spread / 2
    accountObject.ADA -= amount
    accountObject.USDT += amount * price
    return accountObject
}
const cancel = require('app/bittrexFunctions').cancel
const calcROC = require('./calcROC').calcROC
//const updateOrders = require('./transact.js').updateOrders
const updateOrders = (currentPrice) => {
    if (currentPrice < buyPrice) {
        return
    }
}

export const TrendMaker = {
  start : async (capital, currentPrice, spread, accountObject) => {
    this.capital = capital
    this.state = 'running'
    this.APIPollTimeout = 15000
    // create initial orders
    let buyOrder = buyAtBid(capital / currentPrice, currentPrice, .02, accountObject)
    let sellOrder = sellAtAsk()
    this.orders = {buy: buyOrder, sell: sellOrder}
    // build in DB logging redundancy
  }

  newTick : async (currentPrice) => {
    let update = await updateOrders(currentPrice)
    if (update == 'none') {
			console.log('No update')
		}
		else if (update == 'both' && calcROC(12) > 0) {
		//log buy and sell orders to DB
	  	this.orders.buy = await buyAtBid()
	    this.orders.sell = await sellAtAsk()
		}
		else if (update == 'sell' && calcROC(12) > 0) {
			//log sell order
			cancel(this.orders.buy)
			this.orders.buy = await buyAtBid()
			this.orders.sell = await sellAtAsk()
		}
		else if (update == 'buy') {
			console.log('Stopped due to buy')
		}
  }
}
