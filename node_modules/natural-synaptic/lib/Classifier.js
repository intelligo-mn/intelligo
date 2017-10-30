'use strict';

var FeedForwardNetwork = require('./FeedForwardNetwork');
var Trainer = require('synaptic').Trainer;
var _ = require('lodash');

class Classifier {
    constructor (options) {
        if (options && options.network)
            this.network = FeedForwardNetwork.fromJSON(options.network);
        else
            this.network = new FeedForwardNetwork(options);

        this.data = [];
        this.classifications = options && options.classifications || [];
        this.longestDocument = options && options.longestDocument || 0;
        this.trainOptions = _.assign({
            rate: .05,
            iterations: 20 * 1000,
            error: .01,
            shuffle: true,
            cost: Trainer.cost.CROSS_ENTROPY
        }, options || {});
    }

    addExample (features, label) {
        if (!_.includes(this.classifications, label))
            this.classifications.push(label);

        if (features && features.length && features.length > this.longestDocument)
            this.longestDocument = features.length;

        this.data.push({ input: features, label: label});
    }

    train (options) {
        var self = this;
        var cleanData = _.map(this.data, function(item) {
            var activeIndex = _.indexOf(self.classifications, item.label);
            item.output = outputLayer(self.classifications.length, activeIndex)

            return item;
        });

        return this.network.train(cleanData, _.assign(this.trainOptions, {
            inputLayerSize: this.longestDocument,
            outputSize: this.classifications.length
        }));
    }

    getClassifications (features) {
        var result = [];
        var index = 0;
        var self = this;
        var data = this.network.activate(features);

        _.each(data, function(value) {
            var label = self.classifications[index];
            result.push({ label: label, value: value });

            index += 1;
        });

        return result;
    }

    classify (features) {
        var classifications = this.getClassifications(features);
        var max = 0;
        var result = null;

        classifications.forEach(function(current) {
            if(current.value > max) {
                result = current.label;
                max = current.value;
            }
        });

        return result;
    }


    toJSON () {
        return {
            classifications: this.classifications,
            longestDocument: this.longestDocument,
            network: this.network.toJSON()
        };
    }
}


function outputLayer(length, activeIndex) {
    return _.times(length, function(i) {
        if (i === activeIndex) return 1;
        return 0;
    });
}

module.exports = Classifier;
