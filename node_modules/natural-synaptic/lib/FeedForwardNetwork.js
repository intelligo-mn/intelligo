'use strict';

var synaptic = require('synaptic');
var _ = require('lodash');

var Network = synaptic.Network;
var Layer = synaptic.Layer;
var Trainer = synaptic.Trainer;

class FeedForwardNetwork {
    constructor(options) {
        this.layers = options && options.innerLayers || 1;
        this.layerSize = options && options.layerSize;
        this.network = options && options.network;
    }

    toJSON () {
        return {
            network: this.network && this.network.toJSON ? this.network.toJSON() : null,
            innerLayers: this.layers,
            layerSize: this.layerSize
        }
    }

    train (data, options) {
        var self = this;
        var maxInputSize = options.inputLayerSize || _.reduce(data, function(item, result) {
            if (item && item.input && item.input.length > result)
                return item.input;
            return result;
        }, 1);
        var maxOutputSize = data[data.length -1].output.length;

        this.inputLayer = new Layer(maxInputSize);
        this.outputLayer = new Layer(maxOutputSize);

        this.hiddenLayers = [];

        if (!this.layerSize) this.layerSize = _.max([50, maxOutputSize / 2]);
        var lastHiddenLayer = null;

        _.times(this.layers || 1, function() {
            var hiddenLayer = new Layer(self.layerSize);
            self.hiddenLayers.push(hiddenLayer);

            if (lastHiddenLayer)
                lastHiddenLayer.project(hiddenLayer);
            else // first hidden layer, connect to input
               self.inputLayer.project(hiddenLayer);

            lastHiddenLayer = hiddenLayer;
        });

        lastHiddenLayer.project(this.outputLayer);

        this.network = new Network({
            input: this.inputLayer,
            hidden: this.hiddenLayers,
            output: this.outputLayer
        });

        this.trainer = new Trainer(this.network);
        this.trainer.train(data, options);
    }

    activate (input) {
        if (!this.network) throw "This network isn't trained yet";
        return this.network.activate(input);
    }
}

FeedForwardNetwork.fromJSON = function(data) {
    data.network = Network.fromJSON(data.network);
    return new FeedForwardNetwork(data);
};

module.exports = FeedForwardNetwork;
