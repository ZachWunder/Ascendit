const SignalGenerator = require('./SignalGen/TMSignalGen').TrendMakerSignalGenerator;
const RiskManagement = require('./RiskManagement').RiskManagement;
const Execution = require('./Execution').TrendMakerExecution;
const BacktestingExecution = require('./backtesting/backtestingExecution').BacktestingExecution;


const TrendMaker = function(exchange, currencyPair, currencyAmount, risk, targetProfitPercentage, backtesting=false) {

	const Signal = new SignalGenerator(exchange, currencyPair);
    const RM = new RiskManagement(exchange, currencyPair, risk);
	const OrderExecute = backtesting ? new BacktestingExecution(exchange, currencyPair, currencyAmount, targetProfitPercentage) : new Execution(exchange, currencyPair, currencyAmount, targetProfitPercentage);


	//Create initial orders
	OrderExecute.createInitialOrders();

	//Generate new signals every 15 seconds
    setInterval(() => {Signal.check()}, 15000);
	//Send signal to RPManagement
    Signal.on('BothFilled', () =>{RM.checkNewOrder()});
	//Send Approved Order to execution
    RM.on('newOrder', () => {OrderExecute.onSell()});
}

module.exports = {
	TrendMaker : TrendMaker
}
