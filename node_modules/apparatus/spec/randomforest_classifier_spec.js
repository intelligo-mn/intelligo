/*
Copyright (c) 2012 Andrej Karpathy

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

var RandomForestClassifier = new require('../lib/apparatus/classifier/randomforest_classifier');

describe('randomforest', function() {    
	     it('should perform binary classifcation', function() {
		    var randomforest = new RandomForestClassifier();

		    randomforest.addExample([-0.4326,  1.1909   ], 1);
		    randomforest.addExample([1.5    , 3.0       ], 1);
		    randomforest.addExample([0.1253 , -0.0376   ], 1);
		    randomforest.addExample([0.2877 ,   0.3273  ], 1);
		    randomforest.addExample([-1.1465,   0.1746  ], 1);
		    randomforest.addExample([1.8133 ,   2.1139  ], -1);
		    randomforest.addExample([2.7258 ,   3.0668  ], -1);
		    randomforest.addExample([1.4117 ,   2.0593  ], -1);
		    randomforest.addExample([4.1832 ,   1.9044  ], -1);
		    randomforest.addExample([1.8636 ,   1.1677  ], -1);
		    
		    randomforest.train();

		    expect(randomforest.classify([-0.5 , -0.5 ])).toBe(1);

		    // random forest are not deterministic, check on average it works
		    var count = 0;
		    for(var tests=0; tests<200; tests++){
			randomforest.train();
        		if(randomforest.classify([1.0, 2.0]) == 1) {
			    count++;
			}
		    }
		    expect(count).toBeGreaterThan(50);
		});
	 });
