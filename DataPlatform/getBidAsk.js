const ccxt = require('ccxt');
const bittrex = new ccxt.bittrex();
const mongoose = require('mongoose');
const BidAsk = require('./BidAskSchema').BidAsk;


const getOrderBook = async currencyPair => {
	try {


		const orderBook = await bittrex.fetchOrderBook(currencyPair);
		const Bids = orderBook.bids[0][0];
		const Asks = orderBook.asks[0][0];

		await BidAsk.insertMany({
			Bid : Bids, Ask : Asks, CurrencyPair : currencyPair
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
