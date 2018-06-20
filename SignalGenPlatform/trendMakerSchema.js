const mongoose = require('mongoose');
const trendMakerOrderSchema = new mongoose.Schema({
	CurrencyPair : String,
	BuyID : String,
	SellID : String
});

const TrendMaker = mongoose.model('TrendMaker', trendMakerOrderSchema);

module.exports = {
	TrendMaker : TrendMaker
};
