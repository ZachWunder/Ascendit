const mongoose = require('mongoose');

const fullLoggerSchema = new mongoose.Schema({
	StrategyName: String,
	Exchange : String,
	CurrencyPair : String,
	Bought : Number,
    Sold : Number,
    Amount : Number,
    Time : { type: Date, default: Date.now() }
});

const buyLoggerSchema = new mongoose.Schema({
	StrategyName: String,
	Exchange : String,
	CurrencyPair : String,
	Bought : Number,
	Amount : Number,
	Time : { type: Date, default: Date.now() }
});

const sellLoggerSchema = new mongoose.Schema({
	StrategyName: String,
	Exchange : String,
	CurrencyPair : String,
	Sold : Number,
	Amount : Number,
	Time : { type: Date, default: Date.now() }
});

const TMLogger = mongoose.model('TMLogger', fullLoggerSchema);
const BuyLogger = mongoose.model('BuyLogger', buyLoggerSchema);
const SellLogger = mongoose.model('SellLogger', sellLoggerSchema);

module.exports = {
	TMLogger : TMLogger,
	BuyLogger : BuyLogger,
	SellLogger : SellLogger
};
