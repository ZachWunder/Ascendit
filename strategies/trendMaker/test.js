/*const Connection = require('../../app/DBConnections')
const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const db = mongoose.connect(Connection.Mongo)

const testSchema = new Schema({
	name: String,
	number: Number
})

const Test = mongoose.model('Test', testSchema)

const newTest = Test({
	name: 'firstTest',
	number: 1
})

newTest.save( () => {
	if (err) throw err;
	console.log('Success')
})*/

function x () {
	console.log('x');
}

(function y () {
	return x()
})()
