const mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  slugutf = require('slug');
  
// create a schema
const wordSchema = new Schema({
  character: String,
  meanings: String,
  meaningsMongolia: String,
  partOfSpeech: String, // adj, verb, etc
  kanji: String,
  level: String, // jlpt n1, jlpt n2 
  isFavorite: { 
    type: Boolean, 
    default: false 
  },
  isMemorize: { 
    type: Boolean, 
    default: false 
  },
  created: { 
    type: Date, 
    default: Date.now 
  },
  slug: {
    type: String,
    unique: true
  }
});
wordSchema.pre('save', function(next) {
  this.slug = slugutf(this.meanings, slugutf.defaults.modes['rfc3986'] = {
      replacement: '-',      // replace spaces with replacement 
      symbols: true,         // replace unicode symbols or not 
      remove: null,          // (optional) regex to remove characters 
      lower: true,           // result in lower case 
      charmap: slugutf.charmap, // replace special characters 
      multicharmap: slugutf.multicharmap // replace multi-characters 
  });
  next();
});

const wordModel = mongoose.model('Word', wordSchema);

module.exports = wordModel;
