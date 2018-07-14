const EventEmitter = require('events').EventEmitter;

class Test{
    constructor (name) {
        this.name = name;
    }
}

const Inst = new Test('');
console.log(Inst.name)
