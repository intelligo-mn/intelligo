const Word = require('../models/Word');

module.exports = {

  showWords(req, res) {
    Word.find({}, (err, words) => {
      if (err) {
        res.status(404);
        res.send('Words not found!');
      }
  
      res.render('words', { 
        words: words,
        user : req.user,
        success: req.flash('success')
      });
    });
  },

  retWords(req, res) {
    return Word.find({}, (err, words) => {
      if (err) {
        res.status(404);
        res.send('Words not found!');
      }
    });
  },
  
  showSingle(req, res) {
    Word.findOne({ slug: req.params.slug }, (err, word) => {
      if (err) {
        res.status(404);
        res.send('Word not found!');
      }
  
      res.render('single', { 
        word: word,
        user : req.user,
        success: req.flash('success')
      });
    });
  },
  
  seedWords(req, res) {
    const words = [
      { character: "はい", meanings: "yes",  kanji: "", level: "starter", isMemorize: "" },
      { character: "いいえ", meanings: "no",  kanji: "", level: "starter", isMemorize: "" }
    ];
  
  
    Word.remove({}, () => {
      for (word of words) {
        var newWord = new Word(word);
        newWord.save();
        
      }
    });
    
    res.send('Wordbase seeded!');
  },
  
  showCreate(req, res) {
    res.render('create', {
      user : req.user,
      errors: req.flash('errors')
    });
  },
  
  processCreate(req, res) {
    req.checkBody('character', 'Character is required.').notEmpty();
    req.checkBody('meanings', 'Meanings is required.').notEmpty();
  
    const errors = req.validationErrors();
    if (errors) {
      req.flash('errors', errors.map(err => err.msg));
      return res.redirect('/words/create');
    }
    const word = new Word({
      character: req.body.character,
      meanings: req.body.meanings,
      kanji: req.body.kanji,
      level: req.body.level
    });
  
    word.save((err) => {
      if (err)
        throw err;
      req.flash('success', 'Successfuly created word!');
      res.redirect(`/words`);
    });
  },
  
  showEdit(req, res) {
    Word.findOne({ slug: req.params.slug }, (err, word) => {
      res.render('edit', {
        word: word,
        user : req.user,
        errors: req.flash('errors')
      });
    });
  },
  
  processEdit(req, res) {
    req.checkBody('character', 'Character is required.').notEmpty();
    req.checkBody('meanings', 'Meanings is required.').notEmpty();
    const errors = req.validationErrors();
    if (errors) {
      req.flash('errors', errors.map(err => err.msg));
      return res.redirect(`/words/${req.params.slug}/edit`);
    }
    Word.findOne({ slug: req.params.slug }, (err, word) => {
      word.character = req.body.character;
      word.meanings = req.body.meanings;
      word.kanji = req.body.kanji;
      word.level = req.body.level
      word.save((err) => {
        if (err)
          throw err;
        req.flash('success', 'Successfully updated word.');
        res.redirect('/words');
      });
    });
  
  },
  
  deleteWord(req, res) {
    Word.remove({ slug: req.params.slug }, (err) => {
      req.flash('success', 'Word deleted!');
      res.redirect('/words');
    });
  }
}
