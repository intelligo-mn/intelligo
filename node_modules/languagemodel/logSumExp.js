/**
 * Calculate log-sum-exp robustly.
 * 
 * @param a vector of numbers.
 * @return log(sum[i=1..n](exp(ai))) = 
 *         m + log(sum[i=1..n](exp(ai-m)))
 * Where m = max[i=1..n](ai)
 * @note handles large numbers robustly.        
 */
module.exports = function(a) {
	var m = Math.max.apply(null, a);
	var sum = 0;
	for (var i=0; i<a.length; ++i)
		if (a[i]>m-10)
			sum += Math.exp(a[i]-m);
	return m + Math.log(sum);
}

