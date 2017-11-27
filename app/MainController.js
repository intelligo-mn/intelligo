module.exports = {
  showHome: showHome,
  showDashboard: showDashboard
};

function showHome(req, res) {
    res.render('dashboard.ejs', {
		user : req.user 
	});
}

function showDashboard(req, res) {
    res.render('dashboard.ejs', {
    	user : req.user 
    });
}