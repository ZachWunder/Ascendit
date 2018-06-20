const EventEmitter = require('events').EventEmitter;

const mongoose = require('mongoose');
const TrendMakerDB = require('./trendMakerSchema').TrendMaker;
const FullOrderLogger = require('./trendMakerLogger').TMLogger;
const BuyLogger = require('./trendMakerLogger').BuyLogger;
const SellLogger = require('./trendMakerLogger').SellLogger;


const ccxt = require('ccxt');
const bittrex = new ccxt.bittrex();

class TrendMakerSignalGenerator extends EventEmitter {
    constructor(currencyPair) {
        super();
        this.currencyPair = currencyPair;

        await mongoose.connect('mongodb://localhost:27017/trendMaker');
    }

    async check () {
        const buyOrderID = await TrendMakerDB.find({ buyID : this.currencyPair });
        const buyOrder = await bittrex.fetchOrder(buyOrderID);

        const sellOrderID = await TrendMakerDB.find({ sellID : this.currencyPair });
        const sellOrder = await bittrex.fetchOrder(sellOrderID);

        if (buyOrder.status === 'closed' && sellOrder.status === 'closed') {
            await FullOrderLogger.create({
                CurrencyPair : this.currencyPair,
                Bought : buyOrder.price,
                Sold : sellOrder.price,
                Amount : buyOrder.amount,
            });
            this.emit('Both');
        }
        else if (buyOrder.status === 'closed') {
            this.emit('Buy');
            await BuyLogger.create({
                CurrencyPair : this.currencyPair,
                Bought : buyOrder.price,
                Amount : buyOrder.amount,
            });
        }
        else if (sellOrder.status === 'closed') {
            this.emit('Sell');
            await SellLogger.create({
                CurrencyPair : this.currencyPair,
                Sold : sellOrder.price,
                Amount : buyOrder.amount,
            });
        }
    };
}

module.exports = {
	TrendMakerSignalGenerator : TrendMakerSignalGenerator
}
