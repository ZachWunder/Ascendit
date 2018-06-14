const events = require('events');

const testEmitter = new events.EventEmitter;

const first = () => {
	console.log('first');
	testEmitter.emit('firstEmit', 'firstTesting');
};

setInterval( function () {
	first()
}, 10)

module.exports = {
	testEmitter : testEmitter
}
