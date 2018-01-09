const mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  slugutf = require('slug');
  
const categorySchema = new Schema({
  name: String,
  slug: {
    type: String,
    unique: true
  },
  description: String
});

categorySchema.pre('save', function(next) {
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

const categoryModel = mongoose.model('Category', categorySchema);

module.exports = categoryModel;
