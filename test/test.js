const ccxt = require('ccxt');

class test {
    constructor (exchange) {
        this.exchange = exchange;
        this.bittrex = new ccxt[this.exchange]();
    }

    async test () {

        console.log(await this.bittrex.fetchOHLCV('ADA/USDT'));
    }
}

let x = new test('bittrex');

(async function() {
    await x.test()

}());
