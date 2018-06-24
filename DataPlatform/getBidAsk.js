const ccxt = require('ccxt');
const mongoose = require('mongoose');
const BidAsk = require('./BidAskSchema').BidAsk;

const getOrderBook = async (exchange, currencyPair) => {
	try {
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
exports.getBidAsk = getOrderBook;
