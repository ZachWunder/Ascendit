const mongoose = require('mongoose');
const BidAskSchema = new mongoose.Schema({
	Time: { type: Date, default: new Date() },
	Bid: Number,
	Ask: Number,
	CurrencyPair: String,
	Format: {type: String, default: "BidAsk"}
});

const BidAsk = mongoose.model('BidAsk', BidAskSchema);

module.exports = {
	BidAsk : BidAsk
};
