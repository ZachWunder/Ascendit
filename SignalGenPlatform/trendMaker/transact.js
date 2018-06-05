const ccxt = require('ccxt')
const bittrex = new ccxt.bittrex()
const transactBittrex = new ccxt.bittrex({
	apikey: x,
	apisecret: y,
})

async function Buy (price, quantity, options) {
	if (options.bid) {
		return buyAtBid()
	}
	else {

	}
}


async function sellAtAsk (currency, positionSize=1) {
	try {
		const orderBook = await bittrex.fetchOrderBook('ADA/USDT')
	  	const ask = orderBook.bids[0][0]
	  	const bid = orderBook.asks[0][0]
	  	const naturalSpread = Math.abs(ask / bid)
	  	const quantity = balance * positionSize

		if (naturalSpread > 2) { const price = (ask + naturalSpread) / 2 }
	  	else { const price = ask + (2 - naturalSpread) / 2) }

		try {
			const orderUUID = await transactBittrex.createLimitSellOrder(
			currency, quantity, price)
		}
		catch (e) { console.log(e) }

		return new Promise ( (resolve, reject) => {
		    if (orderUUID)
				resolve(orderUUID.result.uuid)
			else {
				reject('error')
		}
	}
	catch (error) {
		return error
	}
}

async function buyAtBid (currency, positionSize=1) {
	try {
		const orderBook = await bittrex.fetchOrderBook('ADA/USDT')
	  	const ask = orderBook.bids[0][0]
	  	const bid = orderBook.asks[0][0]
	  	const naturalSpread = Math.abs(ask / bid)
	  	const quantity = balance * positionSize

		if (naturalSpread > 2) { const price = (bid - naturalSpread) / 2 }
	  	else { const price = bid - (2 - naturalSpread) / 2) }

		const orderUUID = await transactBittrex.createLimitBuyOrder(
		currency, quantity, price)


		return new Promise ( (resolve, reject) => {
	    if (orderUUID)
			resolve(orderUUID.result.uuid)
		else {
			reject('error')
		}
	}
	catch (error) {
		return error
	}
}
//added order UUID
async updateOrders (//here) {
	try {
		let buyOrder = await transactBittrex.fetchOrder(//here)
		let sellOrder = await transactBittrex.fetchOrder(//here)

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
	catch (error) {
		return error
	}
}

modules.export = {
	sellAtAsk : sellAtAsk(),
	buyAtBid : buyAtBid(),
	updateOrders : updateOrders()
}
