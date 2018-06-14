const testEmit = require('./test').testEmitter;

testEmit.on('first', (data) => {
	console.log(data)
});
