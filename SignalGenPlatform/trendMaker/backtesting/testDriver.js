const ccxt = require('ccxt')
//const TrendMaker = require('./testPrototype')

let bittrex = new ccxt.bittrex ({
    "apikey": "5753f2002f754dd38f9ebeaa5ce644cb",
    "apisecret": "e08a50595ebc4fefab712bf150785439"
});

(async function () {
    try {
        const account = {
            USDT: 500,
            ADA: 1470,
            INITUSD: 500,
            INITADA: 1470
        }
        await bittrex.load_markets()
        console.log(await bittrex.fetchOrderBook('ADA/USDT', 3))
        //console.log(await bittrex.fetchOrderBook('ADA/USDT'))
        //TrendMaker.start(account, candleData[0][4], 2 - candle[0], account)

        //for (candle in candleData) {
        //    TrendMaker.nextTick(candle[4])
        //}
    }
    catch (error) {
        console.log(error)
    }

}) ()
