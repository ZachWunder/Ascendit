const EventEmitter = require('events').EventEmitter;

class test {
    constructor (emitter) {
		this.emitter = emitter;

		this.emitter.on('created', () => {
			console.log('constructor created');
		});

		this.emitter.on('testEmit', () => {
			console.log('testEmitted')
		});
    }

	newTick() {
		setInterval(() => {
			this.emitter.createSignal();
		}, 50)
	}



}

class emitter extends EventEmitter{
	constructor () {
		super();
		this.emit('created');
	}

	createSignal () {
		this.emit('testEmit')
	}
}

let y = new emitter();
let x = new test(y);

x.newTick();
