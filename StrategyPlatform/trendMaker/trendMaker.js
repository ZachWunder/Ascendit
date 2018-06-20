const SignalGenerator = require('../SignalGenPlatform/trendMaker').TrendMakerSignalGenerator;
const RPManagement = require('../RiskPortfolioPlatform/trendMaker');
const Execution = require('../ExecutionPlatform/trendMaker').TrendMakerExecution;

const TrendMaker = function(currencyPair, currencyAmount) {

	const Signal = new SignalGenerator(currencyPair);
    const RPM = new RPManagement(currencyPair);
	const OrderExecute = new Execution(currencyPair, currencyAmount);

	//Create initial orders
	OrderExecute.createInitialOrders();

	//Generate new signals every 15 seconds
    setInterval(Signal.check(), 15000);
	//Send signal to RPManagement
    Signal.on('Both', RPM.checkNewOrder());
	//Send Approved Order to execution
    RPM.on('newOrder', OrderExecute.onSell());
}
