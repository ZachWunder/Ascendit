const EventEmitter = require('events').EventEmitter;

class x extends EventEmitter {
	constructor(name) {
		super()
  	this.name = name;
    console.log('x')
  }
  test() {
		console.log(this.name)
  }
}

class y {
	constructor() {
  	this.name = 'y'
    let test = new x('name is x');
    x.test()

  }
}

(function () {
	let testobj = new y()
})()
