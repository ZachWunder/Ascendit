const ccxt = require('ccxt');

class BittrexBacktest extends ccxt.bittrex {
    constructor () {
        super();
        this.orders = [];
    }

    createLimitBuyOrder ( currencyPair, amount, price ) {
        const OrderID = Date.now()
        this.orders.push({ id : OrderID, status : 'open' })
        const IntervalID = setInterval(() => {
            let actualPrice = super.fetchOrderBook(currencyPair)[0][0];
            if ( price >= actualPrice ) {
                this.orders.find
                clearInterval(IntervalID)
            }
        }, 15000)
    }

    fetchOrder (orderID) {
        const order = this.order.find(order => order.id === orderID);
        return order
    }
}

export default BittrexBacktest;
