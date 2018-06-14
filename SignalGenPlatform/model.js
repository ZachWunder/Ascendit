const events = require('events');

//Create new emitter
const exampleEmitter = new events.EventEmitter;

//Define prerequisites for signal generation
const exampleLogic = () => {
	//After logic, emit the signal. Context optional
	exampleEmitter.emit('firstEmit', context);
};

module.exports = {
	//Export exampleLogic
	logic : exampleLogic,
	//Export exampleEmitter
	emitter : exampleEmitter
}
