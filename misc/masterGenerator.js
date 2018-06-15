//Require all strategies
const trendMaker = require('./trendMaker').logic;

//Put all one off operations here:
(function() {
	//TrendMaker
	if (!database.hasPrevOrder) {
		createNewOrder()
	}
}());


setInterval( function () {

	trendMaker()

}, 15000)
