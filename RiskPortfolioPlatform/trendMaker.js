const ccxt = require('ccxt');

class RiskManagement extends EventEmitter {
    constructor (exchange, currencyPair, risk) {
        super();
        this.acceptableDeviation = risk;
        this.currencyPair = currencyPair;
        this.exchange = new ccxt[exchange]();
    }

    checkNewOrder () {
        const accepted = await identifyTrend();
        if (accepted) {
            this.emit('newOrder');
        }
        else {
            this.emit('newOrderDenied');
        }
    }

    private async identifyTrend (acceptableDeviation) => {
        return new Promise(function(resolve, reject) {
            try {
                const OHLCV = await this.exchange.fetchOHLCV(currencyPair, "30m");

                //Get the highest and lowest prices over the last 12 30m candles,
                //The average value is the mean of these
                const recentPrices = OHLCV.slice(-12);
                const minValue = Math.min(...recentPrices);
                const maxValue = Math.max(...recentPrices);

                const averageValue = (minValue + maxValue) / 2;
                const currentPrice = OHLCV[OHLCV.length - 1]

                // If currentPrice is too far from averagePrice reject order
                // otherwise, accept order
                let acceptOrder;
                if (abs(currentPrice / averagePrice) > acceptableDeviation) {
                    acceptOrder = true;
                }
                else {
                    acceptOrder = false;
                }
                resolve(acceptOrder);
            }
            catch (e) {
                reject(e);
            }
        });
    }

}

module.exports = {
    RiskManagement : RiskManagement
}
