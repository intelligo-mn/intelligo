var util = require("util");
var logSumExp = require('./logSumExp');


/**
 * This class represents a simple, unigram-based language model.
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
var LanguageModel = function(opts) {
	this.smoothingCoefficient = opts.smoothingCoefficient || 0.9;
}

LanguageModel.prototype = {

	/**
	 * Train the language with all the given documents.
	 * 
	 * @param dataset
	 *      an array with hashes of the format: 
	 *            {word1:count1, word2:count2,...}
	 *      each object represents the a sentence (it should be tokenized in advance). 
	 */
	trainBatch : function(dataset) {

		// calculate counts for equation (3):
		var mapWordToTotalCount = {};
		var totalNumberOfWordsInDataset = 0;
		for (var i in dataset) {
			var datum = dataset[i];
			var totalPerDatum = 0;
			
			// for each input sentence, count the total number of words in it:
			for (var word in datum) {
				mapWordToTotalCount[word] |= 0;
				mapWordToTotalCount[word] += datum[word];
				totalPerDatum += datum[word];
			}
			datum["_total"] = totalPerDatum;
			totalNumberOfWordsInDataset += totalPerDatum;
		}
		mapWordToTotalCount["_total"] = totalNumberOfWordsInDataset;
		
		this.dataset = dataset;
		this.mapWordToTotalCount = mapWordToTotalCount;
		
		// calculate smoothing factor for equation (3):
		var mapWordToSmoothingFactor = {};
		for (var word in mapWordToTotalCount) {
			mapWordToSmoothingFactor[word] = 
				(1-this.smoothingCoefficient) * this.mapWordToTotalCount[word] / this.mapWordToTotalCount["_total"];
		}
		this.mapWordToSmoothingFactor = mapWordToSmoothingFactor;
		
		this.globalSmoothingFactor = (1/totalNumberOfWordsInDataset)  // a global smoother, for totally unseen words.
	},
	
	/**
	 * @return the map of all words in the training Dataset, each word with its total count in the Dataset.
	 */
	getAllWordCounts: function() {
		return this.mapWordToTotalCount;
	},
	
	/**
	 * @param sentenceCounts a hash {word1: count1, word2: count2, ... "_total": totalCount}, representing a sentence.
	 * @return the log-probability of that sentence, given the model built from the Dataset.
	 */
	logProbSentenceGivenDataset: function(sentenceCounts) {  // (2) log P(w1...wn) = ...
		var logProducts = [];
		for (var i in this.dataset) {
			var datum = this.dataset[i];
			logProducts.push(this.logProbSentenceGivenSentence(sentenceCounts, datum));
		}
		var logSentenceLikelihood = logSumExp(logProducts);
		
		return logSentenceLikelihood - Math.log(this.dataset.length); // The last element is not needed in practice (see eq. (5))
	},

	/**
	 * @param sentenceCounts a hash {word1: count1, word2: count2, ... "_total": totalCount}, representing a sentence.
	 * @param givenSentenceCounts a hash {word1: count1, word2: count2, ... "_total": totalCount}, representing a sentence.
	 * @return the (smoothed) log product probabilities that the words in sentenceCounts appear in the givenSentenceCounts.
	 */
	logProbSentenceGivenSentence: function(sentenceCounts, givenSentenceCounts) {
		var logProduct=0;
		for (var word in sentenceCounts)
			logProduct += sentenceCounts[word] * this.logProbWordGivenSentence(word, givenSentenceCounts);
		return logProduct;
	},
	
	/**
	 * @param word a word from the INPUT domain.
	 * @param givenSentenceCounts a hash {word1: count1, word2: count2, ... "_total": totalCount}, representing a sentence.
	 * @return the (smoothed) probability that the word appears in the sentence.
	 */
	logProbWordGivenSentence: function(word, givenSentenceCounts) {  // (3) p_s(w) =~ pi_s(w) = ...
		if (givenSentenceCounts!==Object(givenSentenceCounts))
			throw new Error("expected givenSentenceCounts to be an object, but found "+JSON.stringify(givenSentenceCounts));
		var totalGivenSentenceCounts = ("_total" in givenSentenceCounts?
				givenSentenceCounts["_total"]:
				Object.keys(givenSentenceCounts).
				    map(function(key){return givenSentenceCounts[key]}).
				    reduce(function(memo, num){ return memo + num; }, 0));

		var prob = (
			word in givenSentenceCounts? 
				this.smoothingCoefficient     * givenSentenceCounts[word] / totalGivenSentenceCounts + this.mapWordToSmoothingFactor[word] + this.globalSmoothingFactor:
			word in this.mapWordToSmoothingFactor? 
				this.mapWordToSmoothingFactor[word] + this.globalSmoothingFactor:
				this.globalSmoothingFactor);
		if (isNaN(prob)) {
			console.log(util.inspect(this,{depth:3}));
			throw new Error("logProbWordGivenSentence("+word+", "+JSON.stringify(givenSentenceCounts)+") is NaN!");
		}
		return Math.log(prob);
	},
	
	toJSON: function() {
		return {
			mapWordToTotalCount: this.mapWordToTotalCount,
			mapWordToSmoothingFactor: this.mapWordToSmoothingFactor,
			globalSmoothingFactor: this.globalSmoothingFactor,
			dataset: this.dataset,
		};
	},

	fromJSON: function() {
		this.mapWordToTotalCount = mapWordToTotalCount;
		this.mapWordToSmoothingFactor = mapWordToSmoothingFactor;
		this.globalSmoothingFactor = globalSmoothingFactor;
		this.dataset = dataset;
	},
}


module.exports = LanguageModel;



if (process.argv[1] === __filename) {
	console.log("LanguageModel.js demo start");
	
	var model = new LanguageModel({
		smoothingFactor : 0.9,
	});

	var wordcounts = require('./wordcounts');
	
	model.trainBatch([
		wordcounts("I want aa"),
		wordcounts("I want bb"),
		wordcounts("I want cc")
	    ]);

	var assertProbSentence = function(sentence, expected) {
		var p = Math.exp(model.logProbSentenceGivenDataset(wordcounts(sentence)));
		if (Math.abs(p-expected)/expected>0.01) {
			console.warn("p("+sentence+") = "+Math.exp(model.logProbSentenceGivenDataset(wordcounts(sentence))), " should be "+expected);
		}
	}

	assertProbSentence("I", 1/3);
	assertProbSentence("I want", 1/9);
	assertProbSentence("I want aa", 0.0123456);
	assertProbSentence("I want aa bb",0.00026);
	assertProbSentence("I want aa bb cc",0.00000427);
	
	console.log("LanguageModel.js demo end");
}
