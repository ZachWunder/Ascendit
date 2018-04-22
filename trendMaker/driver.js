const transactFunctions = require('./transact')
const fns = require('app/bittrexFunctions')
const change = require('./calcROC')

const fs = require('fs')

// when sell order is filled, cancel previous buy, create new buy order at bid, create new sell at ask
// when buy order is filled, create new sell order at ask
function completeOrder(positionSize, spread) {
  transactFunctions.buyAtBid(positionSize, spread)
  transactFunctions.sellAtAsk(positionSize, spread)
}

function checkForFilledOrders() {
  let sellID = fs.readFileSync('./openSellOrders')
  let buyID = fs.readFileSync('./openBuyOrders')

  if (fns.getOrder(sellID).QuantityRemaining === 0 && fns.getOrder(sellID).QuantityRemaining === 0){
    completeOrder()
  }
  else if (fns.getOrder(sellID.QuantityRemaining) === 0) {

  }

}
if (change.ROC(12) > .05 ) {

}
