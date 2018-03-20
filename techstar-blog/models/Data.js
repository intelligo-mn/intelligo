const mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  slugutf = require('slug');
  
// create a schema
const dataSchema = new Schema({
  input: String,
  slug: {
    type: String,
    unique: true
  },
  output: String
});

dataSchema.pre('save', function(next) {
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

const dataModel = mongoose.model('TrainData', dataSchema);

module.exports = dataModel;
