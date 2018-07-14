const ccxt = require('ccxt');
const mongoose = require('mongoose');
const BidAsk = require('./BidAskSchema').BidAsk;

const getBidAsk = async (exchange, currencyPair) => {
	try {
		mongoose.connect('mongodb://ZachWunder:eworatomaRY1@ds231501.mlab.com:31501/ascendittesting')

		const exchange = new ccxt[exchange]();
		const orderBook = await exchange.fetchOrderBook(currencyPair);
		const Bids = orderBook.bids[0][0];
		const Asks = orderBook.asks[0][0];
		const Time = orderBook.timestamp;

		await BidAsk.insertMany({
			Exchange : exchange,
			Time: Time,
			Bid : Bids,
			Ask : Asks,
			CurrencyPair : currencyPair
		});

	}
	catch (e) {
		console.log(e)
	}
	finally {
		await mongoose.disconnect()
	}

}
module.exports = {
	getBidAsk : getBidAsk
}
