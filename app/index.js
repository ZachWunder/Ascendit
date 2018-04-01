const fns = require('./bittrexFunctions')
const EMA = require('technicalindicators').EMA

const ask = fns.askPrice('USDT-ADA')
const bid = fns.bidPrice('USDT-ADA')

const sell = (positionSize, marketname) => { 
    //position size in decimal
    bittrex.tradesell({
        MarketName: marketName,
        OrderType: 'LIMIT',
        Quantity: positionSize * fns.balance(currency),
        Rate: value,
        TimeInEffect: 'GOOD_TIL_CANCELED', 
        ConditionType: 'NONE', 
        Target: 0, 
    }, function( data, err ) {
        console.log( data );
    })
}
function sellAtAsk() {
    ask
        .then(value => {
            console.log("ask: " + value);
            
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