const fns = require('./bittrexFunctions')
const EMA = require('technicalindicators').EMA

const ask = fns.askPrice('USDT-ADA')
const bid = fns.bidPrice('USDT-ADA')

function sell (amountOfBalance) {

}
function sellAtAsk() {
    ask
        .then(value => {
            console.log("ask: " + value);
            bittrex.tradesell({
                MarketName: 'USDT-ADA',
                OrderType: 'LIMIT',
                Quantity: 1.00000000,
                Rate: value,
                TimeInEffect: 'GOOD_TIL_CANCELED', // supported options are 'IMMEDIATE_OR_CANCEL', 'GOOD_TIL_CANCELLED', 'FILL_OR_KILL'
                ConditionType: 'NONE', 
                Target: 0, 
              }, function( data, err ) {
                console.log( data );
              });
        })
        .catch(error => {
            console.log("there was an error: " + error);
        });
}

function placeBuyOrder() {
    bid
        .then(value => {
            console.log("bid: " + value);
        })
        .catch(error => {
            console.log("there was an error: " + error);
        });
}

placeSellOrder()
placeBuyOrder()
// place buy order at bid price 

// place sell order at ask price