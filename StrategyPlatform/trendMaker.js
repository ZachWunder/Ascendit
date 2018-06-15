const SignalGenerator = require('../SignalGenPlatform/trendMaker');
const RPManagement = require('../RiskPortfolioPlatform/trendMaker');

const TrendMaker = function(currencyPair) {

    //Create initial orders

    const Signal = new SignalGenerator(currencyPair);
    const RPM = new RPManagement(currencyPair);
    const Execute = require('../ExecutionPlatform/trendMaker');

    setInterval(Signal.check(), 15000);

    Signal.on('Both', RPM.checkBoth(4));
    Signal.on('Buy', RPM.checkBuy(4));
    Signal.on('Sell', RPM.checkSell(4));

    RPM.on('newOrder', Execute(params));
}
