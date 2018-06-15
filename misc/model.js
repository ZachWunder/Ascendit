const events = require('events');

//Create new emitter
const exampleEmitter = new events.EventEmitter;

const exampleLogic = (context) => {
    if (approved) {
        //params should contain order type, amount, price, limit or market etc
        exampleEmitter.emit('newOrder', params);
    }
}

module.exports = {
	//Export exampleLogic
	logic : exampleLogic,
	//Export exampleEmitter
	emitter : exampleEmitter
}
