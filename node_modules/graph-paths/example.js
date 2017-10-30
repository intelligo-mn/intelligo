console.log("graph-paths.js demo start");

var cheapest_paths = require('./graph-paths').cheapest_paths;

/*
 * The network is defined by a matrix describing the cost of getting from node i to node j.
 * If there is no way from node i to node j, then the cost is infinite.
 */
var costs = [
    [0,1,7,20],
    [Infinity,0,4,19],
    [Infinity,Infinity,0,7],
    [Infinity,Infinity,Infinity,0],
];

var cheapest_paths_from_0 = cheapest_paths(costs, 0);
console.log("cheapest paths from node #0 to all other nodes:");
console.dir(cheapest_paths_from_0); 

console.log("cheapest path from node #0 to node #3:");
console.dir(cheapest_paths_from_0[3]); 

console.log("graph-paths.js demo end");
