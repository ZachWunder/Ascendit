const Order = require('./Order').Order;

class Exchange {
    constructor (dollars, exchange) {
        this.exchange = exchange;
        this.dollars = 0;
        this.currency = 0;
        this.totalOrders = 0;
        this.openOrders = {};
    }

    createLimitBuyOrder (amount, price, currencyPair) {
        let newBuyOrder = new Order(price, amount, "buy", this.exchange, currencyPair);
        newBuyOrder.on('OrderFilled', () => { this.closeSellOrder});
        
    }

    createLimitSellOrder (amount, price, currencyPair) {
        let newSellOrder = new Order(price, amount, "sell", this.exchange, currencyPair);
        newSellOrder.on('OrderFilled', () => { this.closeSellOrder});

    }

    closeBuyOrder (amount, price) {
        console.log('Bought ' + amount + " for " + price);
        this.currency += amount;
        this.dollars -= amount * price;
    }

    closeSellOrder (amount, price) {
        console.log('Sold ' + amount + ' for ' + price);
        this.dollars += amount * price;
        this.currency -= amount;
    }
}
module.exports = {
    Exchange : Exchange
}
