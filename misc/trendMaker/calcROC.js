const ccxt = require('ccxt')
const bittrex = new ccxt.bittrex()

module.exports = {
  ROC: async function (period=12) {
    try {
		let closingPrices = []
		let candleDataTemp = await bittrex.fetchOHLCV ("ADA/USDT", '5m')

		let candleData = candleDataTemp.slice(-period)

		candleData.forEach((candle) => {
				closingPrices.push(candle[4])
		})

		let avgRate = (( closingPrices[closingPrices.length - 1] - closingPrices[0] )
					  / closingPrices[closingPrices.length - 1] ) * 100

		return new Promise((resolve, reject) => {
			if (avgRate) resolve(avgRate)
			else reject('Average Rate of Change missing.')
		})
	}
	catch (error) {
			return error
	}

	}
}
