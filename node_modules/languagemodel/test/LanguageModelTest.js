/**
 * a unit-test for utils related to Homer classifier
 * 
 * @author Erel Segal-Halevi
 * @since 2013-08
 */

var LanguageModel = require('../LanguageModel');
var wordcounts = require('../wordcounts');

describe('Language Model', function() {
	
	var model = new LanguageModel({
		smoothingFactor : 0.9,
	});
	
	var assertProbSentence = function(sentence, expected) {
		var p = Math.exp(model.logProbSentenceGivenDataset(wordcounts(sentence)));
		if (Math.abs(p-expected)/expected>0.01) 
			throw new Error("p("+sentence+") = "+p+" should be "+expected);
	}
	
	it('produces predictable probabilities', function() {
		model.trainBatch([
			wordcounts("I want aa"),
			wordcounts("I want bb"),
			wordcounts("I want cc")
			]);

		assertProbSentence("I", 0.4444444444444444);//1/3);
		assertProbSentence("I want", 0.19753086419753085);//1/9);
		assertProbSentence("I want aa", 0.04389574759945128);//0.0123456);
		assertProbSentence("I want aa bb", 0.007779301935680535);//0.00026);
		assertProbSentence("I want aa bb cc", 0.0012458805398905997);//0.00000427);
	});
});
