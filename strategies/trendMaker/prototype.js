const getOrder = require('./bittrexFunctions.js').getOrder
const buyAtBid = require('./transact').buyAtBid
const sellAtAsk = require('./transact').sellAtAsk
const cancel = require('app/bittrexFunctions').cancel
const calcROC = require('./calcROC').calcROC
const updateOrders = require('./transact.js').updateOrders

export const TrendMaker = {
  start : async (capital) => {
    this.capital = capital
    this.state = 'running'
    this.APIPollTimeout = 15000
    // create initial orders
    let buyOrder = await buyAtBid()
    let sellOrder = await sellAtAsk()
    this.orders = {buy: buyOrder, sell: sellOrder}
    // build in DB logging redundancy
  }

  newTick : async () => {
    let update = await updateOrders()
    if (update == 'none') {
			console.log('No update')
		}
		else if (update == 'both' && calcROC() > 0) {
		//log buy and sell orders to DB
	  	this.orders.buy = await buyAtBid()
	    this.orders.sell = await sellAtAsk()
		}
		else if (update == 'sell' && calcROC() > 0) {
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
