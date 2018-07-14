const EventEmitter = require('events').EventEmitter;
const ccxt = require('ccxt');

class Order extends EventEmitter {
    constructor (price, amount, side, exchange, currencyPair) {
        super()
        this.exchange = new ccxt[exchange] ();
        this.side = side;
        this.price = price;
        this.amount = amount;
        this.ID = Math.floor(new Date() / 1000);
        this.status = 'open';

        setInterval(() => {
            let currentPrice = this.side === "buy" ? this.exchange.fetchOrderBook(currencyPair).bids[0][0] : this.exchange.fetchOrderBook(currencyPair).asks[0][0]
            if (currentPrice <= this.price) {
                this.emit('OrderFilled')
                this.status = closed;
            }
        }, 15000)
    }
}

module.exports = {
    Order : Order
}
