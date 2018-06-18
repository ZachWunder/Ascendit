const mongoose = require('mongoose');
const straddleOrderSchema = new mongoose.Schema({
	BuyID : String,
	SellID : String
});

const straddleOrder = mongoose.model('Candle', candleSchema);

module.exports = {
	Candle: Candle
};
