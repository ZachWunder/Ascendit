const EventEmitter = require('events').EventEmitter;

class TrendMakerSignalGenerator extends EventEmitter {
    constructor(currencyPair) {
        super();
        this.currencyPair = currencyPair;

        //One off operations
        // *** Create initial orders and log ID's to DB (abstract to function)***

    }

    async check () {
        const buyOrderID = await database.find({ buyID });
        const buyOrder = await fetchOrder(buyOrderID);

        const sellOrderID = await database.find({ sellID });
        const sellOrder = await fetchOrder(sellOrderID).status;

        if (buyOrder.status === 'closed' && sellOrder.status === 'closed') {
            // *** Make sure to get rid of ID's in database *** //
            this.emit('Both');
        }
        else if (buyOrder.status === 'closed') {
            emitter.emit('Buy');
        }
        else if (sellOrder.status === 'closed') {
            emitter.emit('Sell');
        }
    };
}

class RunningTrendMakerSignalGenerator extends EventEmitter {
    constructor(currencyPair) {
        super();
        this.currencyPair = currencyPair;
    }

    async check () {
        const buyOrderID = await database.find({ buyID });
        const buyOrder = await fetchOrder(buyOrderID);

        const sellOrderID = await database.find({ sellID });
        const sellOrder = await fetchOrder(sellOrderID).status;

        if (buyOrder.status === 'closed' && sellOrder.status === 'closed') {
            // *** Make sure to get rid of ID's in database *** //
            this.emit('Both');
        }
        else if (buyOrder.status === 'closed') {
            this.emit('Buy');
        }
        else if (sellOrder.status === 'closed') {
            this.emit('Sell');
        }
    };
}




module.exports = {
	TrendMakerSignalGenerator : TrendMakerSignalGenerator,
	RunningTrendMakerSignalGenerator : RunningTrendMakerSignalGenerator
}
