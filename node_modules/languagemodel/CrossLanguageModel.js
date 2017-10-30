var LanguageModel = require('./LanguageModel');
var logSumExp = require('./logSumExp');

var extend = require('util')._extend;

/**
 * This class represents a model for two different languages - input language and output language.
 * Based on:
 *
 * Leuski Anton, Traum David. A Statistical Approach for Text Processing in Virtual Humans tech. rep.University of Southern California, Institute for Creative Technologies 2008.
 * http://www.citeulike.org/user/erelsegal-halevi/article/12540655
 * 
 * @author Erel Segal-Halevi
 * @since 2013-08
 * 
 * opts - may contain the following options:
 * * smoothingCoefficient - the lambda-factor for smoothing the unigram probabilities.
 */
var CrossLanguageModel = function(opts) {
	this.smoothingCoefficient = opts.smoothingCoefficient || 0.9;
	this.inputLanguageModel = new LanguageModel(opts);
	this.outputLanguageModel = new LanguageModel(opts);
}

CrossLanguageModel.prototype = {

	/**
	 * Tell the model that the given sample belongs to the given classes.
	 * 
	 * @param sample
	 *            a document.
	 * @param classes
	 *            an object whose KEYS are classes, or an array whose VALUES are classes.
	 */
	trainOnline: function(features, labels) {
		throw new Error("CrossLanguageModel does not support online training");
	},

	/**
	 * Train the model with all the given documents.
	 * 
	 * @param dataset
	 *            an array with objects of the format: 
	 *            {input: {feature1:count1, feature2:count2,...}, output: {feature1:count1, feature2:count2,...}}
	 */
	trainBatch : function(dataset) {
		this.inputLanguageModel.trainBatch(dataset.map(function(datum) {return datum.input;}));
		this.outputLanguageModel.trainBatch(dataset.map(function(datum) {return datum.output;}));
		this.outputFeatures = extend({}, this.outputLanguageModel.getAllWordCounts());
		delete this.outputFeatures["_total"];
	},

	/**
	 * Train the model with all the given documents.
	 * 
	 * @param dataset
	 *            an array with objects of the format: 
	 *            {input: {feature1:count1, feature2:count2,...}, output: {feature1:count1, feature2:count2,...}}
	 */
	trainOnline: function(input, output) {
		throw new Error("CrossLanguageModel currently does not support online training");
	},
	
	getAllWordCounts: function() {
		return this.mapWordToTotalCount;
	},
	
	/**
	 * Calculate the Kullback-Leibler divergence between the language models of the given samples.
	 * This can be used as an approximation of the (inverse) semantic similarity. between them. 
	 *
	 * @param inputSentenceCounts (hash) represents a sentence from the INPUT domain.
	 * @param outputSentenceCounts (hash) represents a sentence from the OUTPUT domain.
	 * 
	 * @note divergence is not symmetric - divergence(a,b) != divergence(b,a).
	 */
	divergence: function(inputSentenceCounts, outputSentenceCounts) {         // (6)   D(P(W)||P(F)) = ...
		if (outputSentenceCounts!==Object(outputSentenceCounts))
			throw new Error("expected outputSentenceCounts to be an object, but found "+JSON.stringify(outputSentenceCounts));
		var elements = [];   // elements for summation
//		if (inputSentenceCounts!==Object(inputSentenceCounts))
//			throw new Error("expected inputSentenceCounts to be an object, but found "+JSON.stringify(inputSentenceCounts));
//		if (outputSentenceCounts!==Object(outputSentenceCounts))
//			throw new Error("expected outputSentenceCounts to be an object, but found "+JSON.stringify(outputSentenceCounts));
		for (var feature in this.outputFeatures) {
			var logFeatureGivenInput  = this.logProbFeatureGivenSentence(feature, inputSentenceCounts);
//			if (isNaN(logFeatureGivenInput)||!isFinite(logFeatureGivenInput)) throw new Error("logFeatureGivenInput is "+logFeatureGivenInput);
			var probFeatureGivenInput = Math.exp(logFeatureGivenInput);
			var logFeatureGivenOutput = this.outputLanguageModel.logProbWordGivenSentence(feature, outputSentenceCounts);
//			if (isNaN(logFeatureGivenOutput)||!isFinite(logFeatureGivenOutput)) throw new Error("logFeatureGivenOutput ("+feature+", "+outputSentenceCounts+") is "+logFeatureGivenOutput);
			var element = probFeatureGivenInput * (logFeatureGivenInput - logFeatureGivenOutput);
//			if (isNaN(element)||!isFinite(element)) throw new Error(probFeatureGivenInput+" * ("+logFeatureGivenInput+" - "+logFeatureGivenOutput+") = "+element);
			elements.push(element)
		}
		return elements.reduce(function(memo, num){ return memo + num; }, 0);
	},
	
	/**
	 * Calculate the similarity scores between the given input sentence and all output sentences in the corpus, sorted from high (most similar) to low (least similar).
	 *  Note: similarity = - divergence 
	 */
	similarities: function(inputSentenceCounts) {
		var sims = [];
		for (var i in this.outputLanguageModel.dataset) {
			var output = extend({}, this.outputLanguageModel.dataset[i]);
			delete output['_total'];
			sims.push({
				output: output, 
				similarity:  -this.divergence(inputSentenceCounts, output)
			});
		}
		sims.sort(function(a,b) {
			return b.similarity-a.similarity;
		});
		return sims;
	},

	/**
	 * @param feature a single feature (-word) from the OUTPUT domain.
	 * @param givenSentenceCounts a hash that represents a sentence from the INPUT domain.
	 */
	logProbFeatureGivenSentence: function(feature, givenSentenceCounts) {  // (5) P(f|W) = ...
		if (!givenSentenceCounts)
			throw new Error("no givenSentenceCounts");
		var logSentenceAndFeature = this.logProbSentenceAndFeatureGivenDataset(feature,givenSentenceCounts);
		if (isNaN(logSentenceAndFeature)||!isFinite(logSentenceAndFeature)) throw new Error("logSentenceAndFeature is "+logSentenceAndFeature);
		var logSentence = this.inputLanguageModel.logProbSentenceGivenDataset(givenSentenceCounts);
		if (isNaN(logSentence)||!isFinite(logSentence)) throw new Error("logSentence is "+logSentence);
		//console.log("\t\t(5) "+feature+": "+Math.exp(logSentenceAndFeature)*81+" / "+Math.exp(logSentence)*81+" = "+Math.exp((logSentenceAndFeature - logSentence)));
		return logSentenceAndFeature - logSentence;
	},
	
	/**
	 * @param feature a single feature (-word) from the OUTPUT domain.
	 * @param sentenceCounts a hash that represents a sentence from the INPUT domain.
	 * @return the joint probability of the output feature and the input sentence.
	 */
	logProbSentenceAndFeatureGivenDataset: function(feature, sentenceCounts) {  // (2') log P(f,w1...wn) = ...
		if (!sentenceCounts)
			throw new Error("no sentenceCounts");
		var logProducts = [];
		for (var i = 0; i<this.inputLanguageModel.dataset.length; ++i) {
			logProducts.push(
				this.inputLanguageModel .logProbSentenceGivenSentence(sentenceCounts, this.inputLanguageModel.dataset[i]) +
				this.outputLanguageModel.logProbWordGivenSentence(feature, this.outputLanguageModel.dataset[i])
				);
		}
		var logSentenceLikelihood = logSumExp(logProducts);
		
		return logSentenceLikelihood - Math.log(this.inputLanguageModel.dataset.length); // The last element is not needed in practice (see eq. (5))
	},
	
	toJSON: function() {
		return {
			inputLanguageModel: this.inputLanguageModel.toJSON(),
			outputLanguageModel: this.outputLanguageModel.toJSON(),
		};
	},
	
	fromJSON: function(json) {
		this.inputLanguageModel.fromJSON(json.inputLanguageModel);
		this.outputLanguageModel.fromJSON(json.outputLanguageModel);
	}
}



module.exports = CrossLanguageModel;



if (process.argv[1] === __filename) {
	console.log("CrossLanguageModel demo start");
	
	var model = new CrossLanguageModel({
		smoothingFactor : 0.9,
	});
	
	var wordcounts = require('./wordcounts');
	
	model.trainBatch([
		{input: wordcounts("I want aa"), output: wordcounts("a")},
		{input: wordcounts("I want bb"), output: wordcounts("b")},
		{input: wordcounts("I want cc"), output: wordcounts("c")},
		]);

	var assertProbSentence = function(actual, expected) {
		if (Math.abs(actual-expected)/expected>0.01) {
			console.warn("Received "+actual+" but expected "+expected);
		}
	}
	
	var show = function(sentence) {
		console.log(sentence+": ");
		console.dir(model.similarities(wordcounts(sentence)));
//		console.log(model.similarities(wordcounts(sentence)).map(function(sim) {
//			var output = "";
//			for (f in sim.output)
//				if (f!='_total')
//					output += (f+" ");
//			return {output:output, divergence:-sim.similarity};
//		}));
	}
	show("I want");
	show("I want nothing");
	show("I want aa");
	show("I want bb");
	show("I want aa and bb");
	show("I want aa , bb and cc");
	show("I want aa bb cc");
	
	
	console.log("CrossLanguageModel demo end");
}
