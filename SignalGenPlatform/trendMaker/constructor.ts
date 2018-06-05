import { Strategy } from "../strategy";

//helper function imports
const getOrder = require('./bittrexFunctions.js').getOrder
const buyAtBid = require('./transact').buyAtBid
const sellAtAsk = require('./transact').sellAtAsk
const cancel = require('app/bittrexFunctions').cancel
const calcROC = require('./calcROC').calcROC

class TrendMaker implements Strategy {


	riskTolerance: number;
	APIPollTimeout: number;
	state: string;
	orders: { buy: any; sell: any; };
	risk: number;
	capital: number;

	constructor (capital : number, riskTolerance : number) {
		this.capital = capital
		this.risk = riskTolerance
    this.state = 'running'
    this.APIPollTimeout = 15000


	}

	private async start () {
		let buyOrder = await buyAtBid()
		let sellOrder = await sellAtAsk()
		this.orders = {buy: buyOrder, sell: sellOrder}
	}


	public async newTick () {
		let update = await this.updateOrders()
		if (update == 'none') {
			return true
		}
		else if (update == 'both' && calcROC > 0) {
		//log buy and sell orders to DB
	  	this.orders.buy = await buyAtBid()
	    this.orders.sell = await sellAtAsk()
		}
		else if (update == 'sell' && calcROC) {
			//log sell order
			cancel(this.orders.buy)
			this.orders.buy = await buyAtBid()
			this.orders.sell = await sellAtAsk()
		}
		else if (update == 'buy') {
			this.control = 'stopped'
		}
	}

}
