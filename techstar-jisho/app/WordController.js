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
    Word.find({}, {slug : 0, __v : 0}, function(err, datas){
      if (err) {
        res.status(404);
        res.send('Word not found!');
      }
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.setHeader("Access-Control-Allow-Headers", "Cache-Control, Pragma, Origin, Authorization, Content-Type, X-Requested-With");
      res.setHeader("Access-Control-Allow-Methods", "GET, PUT, POST");
      res.send("{\"memorize\":"+JSON.stringify(datas, null, " ")+"}");
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
      { character: "いいえ", meanings: "no", meaningsMongolia: "үгүй", partOfSpeech: "nouns", kanji: "", level: "jlpt5"},
      { character: "あい", meanings: "love", meaningsMongolia: "хайр", partOfSpeech: "nouns", kanji: "愛", level: "jlpt5"},
      { character: "いえ", meanings: "house", meaningsMongolia: "байшин", partOfSpeech: "nouns", kanji: "家", level: "jlpt5"},
      { character: "あお", meanings: "blue", meaningsMongolia: "цэнхэр", partOfSpeech: "nouns", kanji: "青", level: "jlpt5"},
      { character: "おい", meanings: "nephew", meaningsMongolia: "зээ", partOfSpeech: "nouns", kanji: "甥", level: "jlpt5"},{ character: "いいえ", meanings: "no", meaningsMongolia: "үгүй", partOfSpeech: "nouns", kanji: "", level: "jlpt5"},
      { character: "いい", meanings: "good", meaningsMongolia: "сайн", partOfSpeech: "nouns", kanji: "", level: "jlpt5"},
      { character: "あう", meanings: "meet", meaningsMongolia: "уулзах", partOfSpeech: "nouns", kanji: "合う", level: "jlpt5"},
      { character: "かい", meanings: "shellfish", meaningsMongolia: "дун", partOfSpeech: "nouns", kanji: "回", level: "jlpt5"},
      { character: "あか", meanings: "red", meaningsMongolia: "улаан", partOfSpeech: "nouns", kanji: "赤", level: "jlpt5"}
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
      meaningsMongolia: req.body.meaningsMongolia,
      partOfSpeech: req.body.partOfSpeech,
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
      word.meaningsMongolia = req.body.meaningsMongolia;
      word.partOfSpeech = req.body.partOfSpeech;
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
  },
  
   wordCount(req, res) {
    Word.count({}, function(error, numOfDocs) {  
      res.send('Word count '+numOfDocs);
    });
  }
}
