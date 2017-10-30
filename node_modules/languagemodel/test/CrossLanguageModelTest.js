/**
 * a unit-test for utils related to Homer model
 * 
 * @author Erel Segal-Halevi
 * @since 2013-08
 */

var CrossLanguageModel = require('../CrossLanguageModel');
var wordcounts = require('../wordcounts');
var assert = require('assert');

describe('Cross-Language Model', function() {

	var model = new CrossLanguageModel({
		smoothingFactor : 0.9,
	});

	model.trainBatch([
		{input: wordcounts("I want aa"), output: wordcounts("a")},
		{input: wordcounts("I want bb"), output: wordcounts("b")},
		{input: wordcounts("I want cc"), output: wordcounts("c")},
		]);

	it('produces predictable probabilities', function() {

		var assertProbSentence = function(actual, expected) {
			if (Math.abs(actual-expected)/expected>0.01)
				throw new Error("Received "+actual+" but expected "+expected);
		}

		assertProbSentence(Math.exp(model.inputLanguageModel.logProbSentenceGivenDataset(wordcounts("I want"))), 0.19753086419753085);//1/9);
		assertProbSentence(Math.exp(model.logProbSentenceAndFeatureGivenDataset("a",wordcounts("I want"))), 0.13168724279835387);//0.037);
		assertProbSentence(Math.exp(model.logProbFeatureGivenSentence("a",wordcounts("I want"))), 0.6666666666666665);// 1/3);
		assertProbSentence(Math.exp(model.inputLanguageModel.logProbSentenceGivenDataset(wordcounts("I want aa bb cc"))),0.0012458805398905997);//0.00000426);
		assertProbSentence(Math.exp(model.logProbSentenceAndFeatureGivenDataset("a",wordcounts("I want aa bb cc"))),0.0008305870265937329);//0.00000142);
		assertProbSentence(Math.exp(model.logProbFeatureGivenSentence("a",wordcounts("I want aa bb cc"))),0.6666666666666665);//1/3);

		var test = function(sentence) {
			var sims = model.similarities(wordcounts(sentence));
			assert(sims.length==3);
			//console.dir(sims);
		}

		test("I want");
		test("I want nothing");
		test("I want aa");
		test("I want bb");
		test("I want aa and bb");
		test("I want aa , bb and cc");
		test("I want aa bb cc");
	});
});
