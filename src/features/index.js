module.exports = {
	/**
     * Combines the features from several feature extractors. 
     * @param extractors - an array of other feature extractors. 
     * @param sample - a string.
     * @param features an initial hash of features (optional).
     * @return a hash with all features generated from the sample by the different extractors
     */
    collectionOfExtractors(extractors) {
    	return function(sample, features) {
    		for (var i=0; i<extractors.length; ++i)
    			extractors[i](sample, features);
    	}
    },
	FeatureLookupTable: require("./FeatureLookupTable"),
};

/**
 * Call the given featureExtractor on the given sample, and return the result.
 * Used for testing.
 */
module.exports.call = function(featureExtractor, sample) {
	var features = {};
	featureExtractor(sample, features);
	return features;
} 

/**
 * If the input is a featureExtractor, return it as is.
 *
 * If it is an array of featureExtractors, convert it to a CollectionOfExtractors.
 *
 */
module.exports.normalize = function(featureExtractorOrArray) {
	return (!featureExtractorOrArray? 
				featureExtractorOrArray:
			Array.isArray(featureExtractorOrArray)? 
				new module.exports.CollectionOfExtractors(featureExtractorOrArray):
				featureExtractorOrArray);	
}
