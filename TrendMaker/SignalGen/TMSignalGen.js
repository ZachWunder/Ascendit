const EventEmitter = require('events').EventEmitter;

const mongoose = require('mongoose');
const TrendMakerDB = require('./trendMakerSchema').TrendMaker;
const FullOrderLogger = require('./trendMakerLogger').TMLogger;
const BuyLogger = require('./trendMakerLogger').BuyLogger;
const SellLogger = require('./trendMakerLogger').SellLogger;

const ccxt = require('ccxt');

class TrendMakerSignalGenerator extends EventEmitter {
    constructor(exchange, currencyPair) {
        super();

        this.exchangeName = exchange;
        this.currencyPair = currencyPair;
        this.exchange = new ccxt[exchange]();

        await mongoose.connect('mongodb://localhost:27017/trendMaker');
    }

    async check () {
        const buyOrderID = await TrendMakerDB.find({ buyID : this.currencyPair });
        const buyOrder = await this.exchange.fetchOrder(buyOrderID);

        const sellOrderID = await TrendMakerDB.find({ sellID : this.currencyPair });
        const sellOrder = await this.exchange.fetchOrder(sellOrderID);

        if (buyOrder.status === 'closed' && sellOrder.status === 'closed') {
            await FullOrderLogger.create({
                Exchange : this.exchangeName,
                CurrencyPair : this.currencyPair,
                Bought : buyOrder.price,
                Sold : sellOrder.price,
                Amount : buyOrder.amount
            });
            this.emit('BothFilled');
        }
        else if (buyOrder.status === 'closed') {
            this.emit('BuyFilled');
            await BuyLogger.create({
                Exchange : this.exchangeName,
                CurrencyPair : this.currencyPair,
                Bought : buyOrder.price,
                Amount : buyOrder.amount
            });
        }
        else if (sellOrder.status === 'closed') {
            this.emit('SellFilled');
            await SellLogger.create({
                Exchange : this.exchangeName,
                CurrencyPair : this.currencyPair,
                Sold : sellOrder.price,
                Amount : buyOrder.amount
            });
        }
    };
}

module.exports = {
	TrendMakerSignalGenerator : TrendMakerSignalGenerator
}
