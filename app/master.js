const ActiveStrategies = require('./config').ActiveStrategies;
const TrendMaker = require('../TrendMaker/strategy').TrendMaker;

ActiveStrategies[0].TrendMaker.forEach(strategy => {
    TrendMaker(strategy.exchange,
        strategy.currencyPair,
        strategy.currencyAmount,
        strategy.risk,
        strategy.targetProfitPercentage,
        strategy.backtesting);
});
