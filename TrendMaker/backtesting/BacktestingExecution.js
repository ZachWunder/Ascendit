// *** Create new orders and replace ID's in DB *** //
const mongoose = require('mongoose');
const TrendMakerDB = require('../SignalGen/trendMakerSchema').TrendMaker;
const backtestExchange = require('./BacktestExchange').Exchange;
const MongoConnectionURI = require('../../app/DBConnections').Mongo;
const ccxt = require('ccxt');

mongoose.connect(MongoConnectionURI);

class BacktestingExecution {
    constructor (exchange, currencyPair, currencyAmount, targetProfitPercentage) {

        console.log('IMPORTANT: Ensure your account has an equivalent amount of USDT!');

        this.targetProfitPercentage = targetProfitPercentage
        this.exchangeName = exchange;
        this.currencyAmount = currencyAmount;
        this.currencyPair = currencyPair;
        this.backtestExchange = new backtestExchange(currencyAmount, exchange);
        this.exchange = new ccxt[exchange] ();
    }

    async createInitialOrders () {
        try {
            this.createStraddleOrders();
        }
        catch (e) {
            console.log(e);
            console.log('TrendMakerExecution - createInitialOrders');
        }

    }

    onBuy () {
        console.log('Buy Order Filled');
    }

    async onSell () {
        try {
            /*  await this.exchange.cancel(await TrendMaker.find({
                Exchange : this.exchangeName,
                CurrencyPair : this.currencyPair }));
                */

            this.createStraddleOrders();
        }
        catch (e) {
            console.log(e);
            console.log('TrendMakerExecution - onSell');
        }
    }

    async createStraddleOrders () {
        try {
            let buyOrderID = this.backtestExchange.createLimitBuyOrder(this.currencyAmount, await this.buyPrice());
            let sellOrderID = this.backtestExchange.createLimitSellOrder(this.currencyAmount, await this.sellPrice());
        }
        catch (e) {
            console.log(e);
            console.log('ERROR: TrendMakerExecution - createStraddleOrders');
        }
    }

    async sellPrice () {
        const TPP = this.targetProfitPercentage;
        const orderBook = await this.exchange.fetchOrderBook(this.currencyPair);
        return new Promise(async function(resolve, reject) {
            try {
                //When backtesting just change these and feed in with a for loop
                const bid = orderBook.bids[0][0];
                const ask = orderBook.asks[0][0];
                //Calculate spread, accounting for prices being weird
                const naturalSpread = (bid < ask ? bid / ask : ask / bid);

                const price = naturalSpread > TPP ? ask : (ask + ((TPP - naturalSpread) / 2))

                resolve(price);
            }
            catch (e) {
                reject(e);
            }
        });
    }

    async buyPrice () {
        const TPP = this.targetProfitPercentage;
        const orderBook = await this.exchange.fetchOrderBook(this.currencyPair);
        return new Promise(async function(resolve, reject) {
            try {
                //When backtesting just change these and feed in with a for loop
                const bid = orderBook.bids[0][0];
                const ask = orderBook.asks[0][0];
                //Calculate spread, accounting for prices being weird
                const naturalSpread = (bid < ask ? bid / ask : ask / bid);

                const price = naturalSpread > TPP ? bid : (bid - ((TPP - naturalSpread) / 2))

                resolve(price);
            }
            catch (e) {
                reject(e);
            }
        });
    }
}

module.exports = {
    BacktestingExecution : BacktestingExecution
}
