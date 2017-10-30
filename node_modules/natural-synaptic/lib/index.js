'use strict';

var _ = require('lodash');
var fs = require('fs');
var stopwords = require('natural/lib/natural/util/stopwords');
var Classifier = require('./Classifier');
var ClassifierBase = require('natural/lib/natural/classifiers/classifier');
var stopwordsBackup = stopwords.words.slice();

class NaturalSynaptic extends ClassifierBase {
    constructor(options, stemmer) {
        super(new Classifier(_.assign({
            innerLayers: 1
        }, options)), stemmer);

        if (options && options.docs)
            this.docs = options.docs;

        if (options && options.features)
            this.features = options.features;
    }

    save (filename, callback) {
        var data = this.classifier.toJSON();
        data.docs = this.docs;
        data.features = this.features;

        var payload = JSON.stringify(data);

        fs.writeFile(filename, payload, callback);
    };
}

NaturalSynaptic.fromJSON = function(payload, stemmer) {
    return new NaturalSynaptic(payload, stemmer);
};

NaturalSynaptic.load = function(filename, stemmer, callback) {
    if (!callback && stemmer) {
        callback = stemmer;
        stemmer = null;
    }

    fs.readFile(filename, function(err, data) {
        if (err) return callback(err);

        var payload = JSON.parse(data);

        return callback(null, NaturalSynaptic.fromJSON(payload, stemmer));
    });
};

NaturalSynaptic.disableStopWords = function()  {
    stopwords.words.splice(0, stopwords.words.length);
    return stopwordsBackup;
};

NaturalSynaptic.enableStopWords = function() {
    if(!stopwords.length) {
        stopwords.words.push.apply(stopwords.words, stopwordsBackup);
    }
};

NaturalSynaptic.stopwords = stopwords;

module.exports = NaturalSynaptic;
