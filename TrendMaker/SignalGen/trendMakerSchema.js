const mongoose = require('mongoose');
const trendMakerOrderSchema = new mongoose.Schema({
	Name: String,
	Exchange : String,
	CurrencyPair : String,
	BuyID : String,
	SellID : String,
	Status: String
});

const TrendMaker = mongoose.model('TrendMaker', trendMakerOrderSchema);

TrendMaker.getBuyOrder = (name, buyID) => {
	return TrendMaker.find({ Name: name, BuyID: buyID });
}

TrendMaker.getSellOrder = (name, sellID) => {
	return TrendMaker.find({ Name: name, SellID: sellID })
}

TrendMaker.updateBuyOrder = (name, buyID, newBuyID) => {
	return TrendMaker.findOneAndUpdate({ Name : name, BuyID : buyID}, { BuyID : newBuyID});
}

TrendMaker.updateSellOrder = (name, sellID, newSellID) => {
	return TrendMaker.findOneAndUpdate({ Name : name, SellID : SellID}, { BuyID : newSellID});
}

TrendMaker.cancel

module.exports = {
	TrendMaker : TrendMaker
};
