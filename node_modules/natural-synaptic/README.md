# natural-synaptic
[![Circle CI](https://circleci.com/gh/nemo/natural-synaptic/tree/master.svg?style=svg)](https://circleci.com/gh/nemo/natural-synaptic/tree/master)

A natural language classifier for [Node Natural](https://github.com/NaturalNode/natural) using a [Synaptic](https://github.com/cazala/synaptic) neural network.

This project was inspired by [Natural Brain](https://github.com/daffl/natural-brain), which is based on a [BrainJS](https://github.com/harthur/brain) neural network. The reason for the re-write is that BrainJS is currently unmaintained (see [issue](https://github.com/harthur/brain/issues/72)).

Note: This classifier passes the same tests as the [Node Natural Bayes classifier](https://github.com/NaturalNode/natural/blob/a79254585f2e381378f788de5168f6a906e037e8/spec/bayes_classifier_spec.js).


## Usage

### Installing

You can either clone this repo or install it from npm:

```
npm install natural-synaptic --save
```

### Training and Classifying
```javascript
var classifier = new NaturalSynaptic();

classifier.addDocument('my unit-tests failed.', 'software');
classifier.addDocument('tried the program, but it was buggy.', 'software');
classifier.addDocument('tomorrow we will do standup.', 'meeting');
classifier.addDocument('the drive has a 2TB capacity.', 'hardware');
classifier.addDocument('i need a new power supply.', 'hardware');
classifier.addDocument('can you play some new music?', 'music');

classifier.train();

console.log(classifier.classify('did the tests pass?')); // -> software
console.log(classifier.classify('did you buy a new drive?')); // -> hardware
console.log(classifier.classify('What is the capacity?')); // -> hardware
console.log(classifier.classify('Lets meet tomorrow?')); // -> meeting
console.log(classifier.classify('Can you play some stuff?')); // -> music
```

## Load/Reload from file
```javascript

var classifier = new NaturalSynaptic();

classifier.addDocument('my unit-tests failed.', 'software');
classifier.addDocument('tried the program, but it was buggy.', 'software');
classifier.addDocument('tomorrow we will do standup.', 'meeting');
classifier.addDocument('the drive has a 2TB capacity.', 'hardware');
classifier.addDocument('i need a new power supply.', 'hardware');
classifier.addDocument('can you play some new music?', 'music');

classifier.train();

classifier.save("file_to_save.json", function(err) {
    NaturalSynaptic.load("file_to_save.json", function(err, newClassifier) {
        console.log(newClassifier.classify('did the tests pass?')); // -> software
        console.log(newClassifier.classify('did you buy a new drive?')); // -> hardware
        console.log(newClassifier.classify('What is the capacity?')); // -> hardware
        console.log(newClassifier.classify('Lets meet tomorrow?')); // -> meeting
        console.log(newClassifier.classify('Can you play some stuff?')); // -> music
    });
});
