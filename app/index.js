const fns = require('./bittrexFunctions')
const EMA = require('technicalindicators').EMA

const ask = fns.askPrice('USDT-ADA')
const bid = fns.bidPrice('USDT-ADA')


function sellAtAsk() {
    ask
        .then(value => {
            console.log("ask: " + value);
            let x = fns.sell('USDT-ADA', fns.balance('ADA'), value)
            //log uuid returned from sell
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
