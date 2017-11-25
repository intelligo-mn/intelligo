const mainController   = require('../app/MainController'),
      dataController   = require('../app/DataController');

module.exports = function(app, passport) {

    app.get('/', mainController.showHome);
    
    app.get('/datas',       dataController.showDatas);
    
    app.get('/datas/seed',  dataController.seedDatas);
    
    app.get('/datas/create',  dataController.showCreate);
    app.post('/datas/create', dataController.processCreate);
    
    app.get('/datas/:slug/edit', dataController.showEdit);
    app.post('/datas/:slug',     dataController.processEdit);
    
    app.get('/datas/:slug/delete', dataController.deleteData);
    
    app.get('/datas/:slug', dataController.showSingle);

    // =====================================
    // LOGIN ===============================
    // =====================================
    // show the login form
    app.get('/login', function(req, res) {

        // render the page and pass in any flash data if it exists
        res.render('login.ejs', { message: req.flash('loginMessage') }); 
    });

    // process the login form
    // app.post('/login', do all our passport stuff here);

    // =====================================
    // SIGNUP ==============================
    // =====================================
    // show the signup form
    app.get('/signup', function(req, res) {

        // render the page and pass in any flash data if it exists
        res.render('signup.ejs', { message: req.flash('signupMessage') });
    });

    // process the signup form
    // app.post('/signup', do all our passport stuff here);

    // =====================================
    // PROFILE SECTION =====================
    // =====================================
    // we will want this protected so you have to be logged in to visit
    // we will use route middleware to verify this (the isLoggedIn function)
    app.get('/profile', isLoggedIn, function(req, res) {
        res.render('profile.ejs', {
            user : req.user // get the user out of session and pass to template
        });
    });

    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });
};

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.redirect('/');
}
