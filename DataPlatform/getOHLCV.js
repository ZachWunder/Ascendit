const ccxt = require('ccxt');
const mongoose = require('mongoose');
const Candle = require('./OHLCVSchema').Candle;

const saveData = async (exchange, currencyPair, timeFrame) => {
	try {
		await mongoose.connect('mongodb://localhost:27017/OHLCV');

		const exchangeObj = new ccxt[exchange]();

		let candleDocs = [];
		let data = await exchangeObj.fetchOHLCV(currencyPair, timeFrame);
		data.forEach( dataCandle => {
			candleDocs.push( new Candle({
				Exchange : exchange
				Time: dataCandle[0],
				Open: dataCandle[1],
				High: dataCandle[2],
				Low: dataCandle[3],
				Close: dataCandle[4],
				Volume: dataCandle[5],
				CurrencyPair: currencyPair,
				TimeFrame: timeFrame
			}))
		});

		//Find latest candle
		const latestStoredCandle = await Candle.findOne({CurrencyPair: currencyPair}).sort('-Time');

		if (latestStoredCandle) {
			const newCandlesIndex = candleDocs.findIndex(candle => candle.Time === latestStoredCandle.Time);
			await Candle.insertMany(candleDocs.slice(newCandlesIndex + 1))
		}
		else {
			await Candle.insertMany(candleDocs);
		}
	}
	catch(e) {
		console.log(e);
	}
	finally {
		mongoose.disconnect();
	}
}


exports.getOHLCV = saveData;
