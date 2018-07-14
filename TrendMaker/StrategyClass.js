const SignalGenerator = require('./SignalGen/TMSignalGen').TrendMakerSignalGenerator;
const RiskManagement = require('./RiskManagement').RiskManagement;
const Execution = require('./Execution').TrendMakerExecution;
const BacktestingExecution = require('./backtesting/backtestingExecution').BacktestingExecution;

class TrendMaker {
    constructor (name, exchange, currencyPair, currencyAmount, risk, targetProfitPercentage, backtesting) {
        this.name = name;
        this.exchange = exchange;
        this.currencyPair = currencyPair;
        this.currencyAmount = currencyAmount;
        this.risk = risk;
        this.targetProfitPercentage = targetProfitPercentage;
        this.backtesting = backtesting;
        this.running = "stopped"; // "off" : initial not created, "stopped" : initial created, "on" : running

        this.SignalGen = new SignalGenerator (exchange, currencyPair);
        this.RiskManagement = new RiskManagement (exchange, currencyPair, risk)
        this.Execution = backtesting ? new BacktestingExecution(exchange, currencyPair, currencyAmount, targetProfitPercentage) : new Execution(exchange, currencyPair, currencyAmount, targetProfitPercentage);
    }

    start ()  {
        if (this.running === "off") {
            this.running = true;
            Execution.createInitialOrders();

            //Generate new signals every 15 seconds
            setInterval(() => { this.Signal.check() }, 15000);
            //Send signal to RManagement
            this.Signal.on('BothFilled', () =>{ RM.checkNewOrder() });
            //Send Approved Order to execution
            this.RiskManagement.on('newOrder', () => { OrderExecute.onSell() });
        }
        else if (this.running === "stop") {

        }
        else {
            console.log(this.name + 'Already Running');
        }

    }

    stop () {
        if (this.running) {

        }
        else {
            console.log('Already Stopped')
        }
    }
}
