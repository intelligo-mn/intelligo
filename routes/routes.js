const mainController   = require('../app/MainController'),
      dataController   = require('../app/DataController');

module.exports = function(app, passport) {

    app.get('/', isLoggedIn, function(req, res) {
		res.render('home.ejs', {
			user : req.user 
		});
	});
	
    app.get('/datas',       dataController.showDatas);
    
    app.get('/datas/seed',  dataController.seedDatas);
    
    app.get('/datas/create',  dataController.showCreate);
    app.post('/datas/create', dataController.processCreate);
    
    app.get('/datas/:slug/edit', dataController.showEdit);
    app.post('/datas/:slug',     dataController.processEdit);
    
    app.get('/datas/:slug/delete', dataController.deleteData);
    
    app.get('/datas/:slug', dataController.showSingle);

    app.get('/login', function(req, res) {
        res.render('login.ejs', { message: req.flash('loginMessage') }); 
    });
    app.post('/login', passport.authenticate('local-login', {
        successRedirect : '/', // redirect to the secure profile section
        failureRedirect : '/login', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));
    
    app.get('/signup', function(req, res) {
        res.render('signup.ejs', { message: req.flash('signupMessage') });
    });
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/', // redirect to the secure profile section
        failureRedirect : '/signup', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/login');
    });
};

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.redirect('/login');
}
