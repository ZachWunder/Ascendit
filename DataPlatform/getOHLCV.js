const ccxt = require('ccxt');
const mongoose = require('mongoose');
const bittrex = new ccxt.bittrex();
const Candle = require('./OHLCVSchema').Candle;

const saveData = async (currencyPair, timeFrame) => {
	try {
		await mongoose.connect('mongodb://localhost:27017/OHLCV');

		let candleDocs = [];
		let data = await fetchData(currencyPair, timeFrame);
		data.forEach( dataCandle => {
			candleDocs.push( new Candle({
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

const fetchData = async (currencyPair, timeFrame) => {
	try {
		let data = await bittrex.fetchOHLCV(currencyPair, timeFrame);
		return new Promise( (resolve, reject) => {
			if(data) resolve(data);
			else reject('exchange interaction issue');
		})
	}
	catch(e) {
		throw e;
	}

};

exports.getOHLCV = saveData;
