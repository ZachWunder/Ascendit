const ccxt = require('ccxt');
const bittrex = new ccxt.bittrex();

const sellPrice = () => {
    return new Promise(function(resolve, reject) {
        try {
            const orderBook = await bittrex.fetchOrderBook('ADA/USDT');
            const bid = orderBook.bids[0][0];
            const ask = orderBook.asks[0][0];
            //Calculate spread, accounting for prices being weird
            const naturalSpread = (bid < ask ? bid / ask : ask / bid);

            if (naturalSpread > 2) {
                const price = ask;
            }
            else {
                const price = ask + ((2 - naturalSpread) / 2);
            }

            resolve(price)
        }
        catch (e) {
            reject(e)
        }
    });
}
const buyPrice = (targetProfitPercentage) => {
    return new Promise(function(resolve, reject) {
        try {
            //When backtesting just change these and feed in with a for loop
            const orderBook = await bittrex.fetchOrderBook('ADA/USDT');
            const bid = orderBook.bids[0][0];
            const ask = orderBook.asks[0][0];
            //Calculate spread, accounting for prices being weird
            const naturalSpread = (bid < ask ? bid / ask : ask / bid);

            if (naturalSpread > targetProfitPercentage) {
                const price = bid;
            }
            else {
                const price = bid - ((targetProfitPercentage - naturalSpread) / 2);
            }
            resolve(price);
        }
        catch (e) {
            reject(e);
        }
    });
}
