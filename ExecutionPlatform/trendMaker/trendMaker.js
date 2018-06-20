// *** Create new orders and replace ID's in DB *** //
const secrets = require('./secrets/realSecrets');

const orderPrices = require('./calculations');

const mongoose = require('mongoose');
const TrendMakerDB = require('../SignalGenPlatform/trendMakerSchema').TrendMaker;

const ccxt = require('ccxt');
const bittrex = new ccxt.bittrex();
bittrex.apiKey = secrets.key;
bittrex.apiSecret = secrets.secret;

class TrendMakerExecution {

    constructor (currencyPair, currencyAmount) {
        await mongoose.connect('mongodb://localhost:27017/trendMaker');
        console.log('IMPORTANT: Ensure your account has an equivalent amount of USDT!');

        this.currencyAmount = currencyAmount;
        this.currencyPair = currencyPair;
    }

    async createInitialOrders () {
        try {
            createStraddleOrders();
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
            await bittrex.cancel(await TrendMaker.find({ CurrencyPair : this.currencyPair }));

            createStraddleOrders();
        }
        catch (e) {
            console.log(e);
            console.log('TrendMakerExecution - onSell');
        }
    }

    private async createStraddleOrders () {
        try {
            let buyOrderID = await bittrex.createLimitBuyOrder(this.currencyPair, this.currencyAmount, orderPrices.buyPrice());
            let sellOrderID = await bittrex.createLimitSellOrder(this.currencyPair, this.currencyAmount, orderPrices.sellPrice());

            await TrendMakerDB.deleteOne({ CurrencyPair : this.currencyPair });

            await TrendMakerDB.create({
                CurrencyPair : this.currencyPair,
                BuyID : buyOrderID,
                SellID : sellOrderID
            };
        }
        catch (e) {
            console.log(e);
            console.log('TrendMakerExecution - createStraddleOrders');
        }
}
