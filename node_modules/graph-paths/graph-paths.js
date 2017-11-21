/**
 * Find the shortest / cheapest paths in a dense graph.
 * 
 * @author Erel Segal-Halevi
 * @since 2013-08
 * @license GPL
 */

/**
 * @param costs a square matrix, n-by-n, where element (i,j) is the direct cost from node i to node j.
 * All costs are assumed to be non-negative.
 * @param start one of the nodes (0...n-1).
 * @return an array, where element j is: 
 * 	{ cost: best_cost_from_i, path: best_path_from_i }
 * Uses a simple dynamic programming algorithm. 
 */
var cheapest_paths = function(costs, start) {
	var numnodes = costs.length;
	if (!costs[start])
		throw new Error("Node "+start+" does not exist in costs matrix");
	if (costs[start].length!=numnodes)
		throw new Error("Costs matrix is not square - it has "+numnodes+" rows and "+costs[start].length+" columns");

	// initialization:
	var numsteps = 1;
	var costs_from_start_using_numsteps = [];
	for (var targetnode=0; targetnode<numnodes; ++targetnode) {
		costs_from_start_using_numsteps[targetnode] = {
			cost: costs[start][targetnode],
			path: targetnode==start? [start]: [start, targetnode]
		}
	}
	for (++numsteps; numsteps<numnodes; ++numsteps) {
		//console.dir(costs_from_start_using_numsteps);
		var costs_from_start_using_numsteps_plus_1 = [];
		for (var targetnode=0; targetnode<numnodes; ++targetnode) {
			var cost_from_start_through_middle_using_numsteps_plus_1 = [];
			for (var middlenode=0; middlenode<numnodes; ++middlenode) {
				cost_from_start_through_middle_using_numsteps_plus_1[middlenode] = 
					costs_from_start_using_numsteps[middlenode].cost +
					costs[middlenode][targetnode];
			}
			var bestMiddlenode = argmin(cost_from_start_through_middle_using_numsteps_plus_1);
			if (!costs_from_start_using_numsteps[bestMiddlenode])
				throw new Error("costs_from_start_using_numsteps["+bestMiddlenode+"] does not exist");
			var bestcost =   cost_from_start_through_middle_using_numsteps_plus_1[bestMiddlenode];
			if (bestcost != costs_from_start_using_numsteps[targetnode].cost) {
				costs_from_start_using_numsteps_plus_1[targetnode] = {
					cost: cost_from_start_through_middle_using_numsteps_plus_1[bestMiddlenode],
					path: costs_from_start_using_numsteps[bestMiddlenode].path.concat([targetnode])
				}
			} else {
				costs_from_start_using_numsteps_plus_1[targetnode] = costs_from_start_using_numsteps[targetnode]
			}
		}
		costs_from_start_using_numsteps = costs_from_start_using_numsteps_plus_1;
	}
	
	return costs_from_start_using_numsteps_plus_1;
}



//UTILS:

var argmax = function(array, iterator) {
	var max = -Infinity;
	var arg = 0;
	for (var i=0; i<array.length; ++i) {
		var element = (iterator? iterator(array[i]): array[i]);
		if (element>max) {
			max = element;
			arg = i;
		}
	}
	return arg;
}

var argmin = function(array, iterator) {
	var min = Infinity;
	var arg = 0;
	for (var i=0; i<array.length; ++i) {
		var element = (iterator? iterator(array[i]): array[i]);
		if (element<min) {
			min = element;
			arg = i;
		}
	}
	return arg;
}



module.exports = {
	cheapest_paths: cheapest_paths
}
