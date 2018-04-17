const mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  slugutf = require('slug');
  
// create a schema
const wordSchema = new Schema({
  character: String,
  meanings: String,
  kanji: String,
  level: String,
  slug: {
    type: String,
    unique: true
  }
});
wordSchema.pre('save', function(next) {
  this.slug = slugutf(this.input, slugutf.defaults.modes['rfc3986'] = {
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
