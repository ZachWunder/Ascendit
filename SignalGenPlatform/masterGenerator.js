//Require all strategies
const trendMaker = require('./trendMaker').logic;

setInterval( function () {
	trendMaker()
}, 15000)
