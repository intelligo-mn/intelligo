var NeuralNetwork = require('brain.js').NeuralNetwork;

NeuralNetwork.prototype.trainOnline = function () {throw new Error("NeuralNetwork does not support online training");}; 
NeuralNetwork.prototype.trainBatch  = function(dataset) {
	dataset.forEach(function(datum) {
		if (!Array.isArray(datum.output) && !(datum.output instanceof Object)){
			datum.output = [datum.output];
		}
	});
	this.train(dataset); 
};
NeuralNetwork.prototype.classify  = NeuralNetwork.prototype.run; 

module.exports = NeuralNetwork;
