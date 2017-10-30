languagemodel
=============

"A statistical language model assigns a probability to a sequence of m words P(w_1,\ldots,w_m) by means of a probability distribution." [(Wikipedia)](http://en.wikipedia.org/wiki/Language_model)

This module provides a unigram-based cross-lingual language model, inspired by: [Leuski Anton, Traum David. A Statistical Approach for Text Processing in Virtual Humans tech. rep.University of Southern California, Institute for Creative Technologies 2008.](http://www.citeulike.org/user/erelsegal-halevi/article/12540655)

A CrossLanguageModel can be used as a multi-class classifier/ranker, but, it also takes into account the structure of the output classes. 


install
=======

    npm install languagemodel

use
===

    var CrossLanguageModel = require('languagemodel').CrossLanguageModel;

    var model = new CrossLanguageModel({
        smoothingFactor : 0.9
    });
    
    model.trainBatch([
        {input: {i:1, want:1, aa:1}, output: {a:1}},
        {input: {i:1, want:1, bb:1}, output: {b:1}},
        {input: {i:1, want:1, cc:1}, output: {c:1}},
        ]);

    console.dir(model.similarities({i:1, want:1, aa:1, and:1, bb:1}));

==>

    [ { output: { a: 1 }, similarity: -0.29506393100486217 },
      { output: { b: 1 }, similarity: -0.29506393100486217 },
      { output: { c: 1 }, similarity: -0.6413224201123425 } ]


