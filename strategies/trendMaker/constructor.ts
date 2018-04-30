import { Strategy } from "./strategy";



const getOrder = require('./bittrexFunctions.js').getOrder
const buyAtBid = require('./transact').buyAtBid
const sellAtAsk = require('./transact').sellAtAsk

class TrendMaker implements Strategy {


	riskTolerance: number;
	APIPollTimeout: number;
	state: string;
	control: string;
	orders: { buy: any; sell: any; };
	risk: number;
	capital: number;

     constructor (capital : number, riskTolerance : number) {
          this.capital = capital
          this.risk = riskTolerance
          this.orders = {buy: null, sell: null}
          this.control = 'off'
          this.state = 'running'
          this.APIPollTimeout = 15000
     }



  //TODO: Abstract to new file
  private updateOrders () {
    let buyOrder = getOrder(this.orders.buy)
    let sellOrder = getOrder(this.orders.sell)
    if (buyOrder.Quantity == 0 && sellOrder.Quantity == 0)
      return 'both'
    else if (sellOrder.Quantity == 0)
      return 'sell'
    else if (buyOrder.Quantity == 0)
      return 'buy'
    else
      return 'neither'
  }

  newTick () : void {
	  let orderOutcome = this.updateOrders()
	  if (orderOutcome == 'both') {
	    this.orders.buy = buyAtBid() //
	    this.orders.sell = sellAtAsk() //
	}
  }

}
