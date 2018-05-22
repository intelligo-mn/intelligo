const Word = require('../models/Word');

module.exports = {
    
    showDashboard(req, res) {
        Word.find({}, (err, words) => {
          if (err) {
            res.status(404);
            res.send('Words not found!');
          }
      
          res.render('dashboard', { 
            words: words,
            user : req.user,
            success: req.flash('success')
          });
        });
    }
    
};

