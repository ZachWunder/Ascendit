//DB Declarations
const mongoose = require('mongoose')
const Connection = require(../app/DBConnections)
const db = mongoose.connect(Connection.Mongo)
//CCXT Declarations
const ccxt = require('ccxt')
const getOrder = require('./bittrexFunctions.js').getOrder,
const buyAtBid = require('./transact').buyAtBid
const sellAtAsk = require('./transact').sellAtAsk
const calcROC = require('./calcROC').calcROC
const updateOrders = require('./transact.js').updateOrders


const TrendMaker = {
 	start : async (capital) => {
	    this.capital = capital
	    this.state = 'running'
	    // create initial orders
		try {
	    	let buyOrder = await buyAtBid()
	    	let sellOrder = await sellAtAsk()
		}
		catch (error) {
			throw error
		}
	    this.orders = { buy: buyOrder, sell: sellOrder}
	    // build in DB logging redundancy
  }

	newTick : async () => {
		try {
			let update = await updateOrders()
			let momentum = calcROC()

			if (update == 'none') {
				console.log('No update')
			}
			else if (update == 'both' && momentum > -4) {
				//log buy and sell orders to DB
				this.orders.buy = await buyAtBid()
				this.orders.sell = await sellAtAsk()
			}
			else if (update == 'sell' && momentum > -4 && momentum < 4) {
				//log sell order
				transactBittrex.cancelOrder(this.orders.buy)
				this.orders.buy = await buyAtBid()
				this.orders.sell = await sellAtAsk()
			}
			else if (update == 'buy') {
				console.log('Stopped due to buy')
			}
		}
		catch (error) {
	  		return error
		}
	}
}
