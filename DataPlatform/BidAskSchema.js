const mongoose = require('mongoose');
const BidAskSchema = new mongoose.Schema({
	Exchange : String,
	Time: Number,
	Bid: Number,
	Ask: Number,
	CurrencyPair: String,
	Format: {type: String, default: "BidAsk"}
});

const BidAsk = mongoose.model('BidAsk', BidAskSchema);

module.exports = {
	BidAsk : BidAsk
};
