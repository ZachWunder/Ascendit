const mongoose = require('mongoose');
const candleSchema = new mongoose.Schema({
	Exchange : String,
	Time: Number,
	Open: Number,
	High: Number,
	Low: Number,
	Close: Number,
	Volume: Number,
	CurrencyPair: String,
	TimeFrame: String,
	Format: {type: String, default: "OHLCV"}
});

const Candle = mongoose.model('Candle', candleSchema);

module.exports = {
	Candle: Candle
};
