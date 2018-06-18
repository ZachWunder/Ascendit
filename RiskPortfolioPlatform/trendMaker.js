const ccxt = require('ccxt');
const bittrex = new ccxt.bittrex();

const calcVolatility = async () => {
    return new Promise(function(resolve, reject) {
        try {
            let OHLCV = await bittrex.fetchOHLCV('currencyPair');
            // Max volatility calculation
            let recentOHLCV = OHLCV.slice(-12);
            let total;
            for (let i = 1; i < recentOHLCV.length; i++) {
                totalVolatility += abs(recentOHLCV[i] - recentOHLCV[i-1]) / recentOHLCV[i-1];
            }
            const volatility = totalVolatility / recentOHLCV.length;

            resolve(volatility);
        }
        catch (e) {
            reject(e);
        }
    });
}



class RiskPortfolioManagement extends EventEmitter {
    constructor (currencyPair, capital) {
        this.currencyPair = currencyPair;
		this.capital = capital;
    }

    checkBuy (maxVolatility) {
        const volatility = await calcVolatility();
        if (volatility < maxVolatility) {
            this.emit('newOrder', {
				bittrex.
            })
        }
    }

    checkSell (maxVolatility) {
        const volatility = await calcVolatility();
        if (volatility < maxVolatility) {
            this.emit('newOrder', {

            })
        }
    }

    checkBoth (maxVolatility) {
        const volatility = await calcVolatility();
        if (volatility < maxVolatility) {
            this.emit('newOrder', {

            })
        }
    }

}

module.exports = {
    RiskPortfolioManagement : RiskPortfolioManagement
}
