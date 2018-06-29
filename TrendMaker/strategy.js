const SignalGenerator = require('../SignalGenPlatform/trendMaker').TrendMakerSignalGenerator;
const RiskManagement = require('../RiskPortfolioPlatform/trendMaker').RiskManagement;
const Execution = require('../ExecutionPlatform/trendMaker').TrendMakerExecution;

// NEW PROGRAM STRUCTURE: PUSH ALL TRENDMAKER AND STRATEGY SPECIFIC TO ITS OWN FILE
// BUT KEEP STRATEGY AND RISK AND EXECUTION (MAYBE RISK AND EXECUTION)
// COULD BE USED TO BRING TOGETHER SUCH AS MACD CROSSING AND OTHER COMMON THINGS

const TrendMaker = function(exchange, currencyPair, currencyAmount, risk, targetProfitPercentage) {

	const Signal = new SignalGenerator(exchange, currencyPair);
    const RM = new RiskManagement(exchange, currencyPair, risk);
	const OrderExecute = new Execution(exchange, currencyPair, currencyAmount, targetProfitPercentage);

	//Create initial orders
	OrderExecute.createInitialOrders();

	//Generate new signals every 15 seconds
    setInterval(Signal.check(), 15000);
	//Send signal to RPManagement
    Signal.on('BothFilled', RM.checkNewOrder());
	//Send Approved Order to execution
    RM.on('newOrder', OrderExecute.onSell());
}
