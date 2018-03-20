module.exports = {
    showHome(req, res) {
        res.render("home.ejs", {
    		user : req.user 
    	});
    },
    
    showDashboard(req, res) {
        res.render("dashboard.ejs", {
        	user : req.user 
        });
    }
};

