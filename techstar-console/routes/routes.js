const mainController   = require('../app/MainController'),
      dataController   = require('../app/DataController');
      
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.redirect('/login');
}

module.exports = function(app, passport) {
    
    app.get('/', mainController.showHome);
	
    app.get('/console', isLoggedIn, mainController.showDashboard);
	
    app.get('/datas', isLoggedIn, dataController.showDatas);
    
    app.get('/datas/seed', isLoggedIn, dataController.seedDatas);
    
    app.get('/datas/create', isLoggedIn, dataController.showCreate);
    app.post('/datas/create', isLoggedIn, dataController.processCreate);
    
    app.get('/datas/:slug/edit', isLoggedIn, dataController.showEdit);
    app.post('/datas/:slug', isLoggedIn, dataController.processEdit);
    
    app.get('/datas/:slug/delete', isLoggedIn, dataController.deleteData);
    
    app.get('/datas/:slug', isLoggedIn, dataController.showSingle);

    app.get('/login', function(req, res) {
        res.render('login.ejs', { message: req.flash('loginMessage') }); 
    });
    
    app.post('/login', passport.authenticate('local-login', {
        successRedirect : '/console', // redirect to the secure profile section
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
