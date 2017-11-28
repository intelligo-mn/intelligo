const mongoose = require('mongoose'),
  Schema = mongoose.Schema;

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
  this.slug = slugify(this.input);
  next();
});

const dataModel = mongoose.model('TrainData', dataSchema);

module.exports = dataModel;

// function to slugify a name
function slugify(text) {
  return text.toString().toLowerCase()
    .replace(/\s+/g, '-')           // Replace spaces with -
    .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
    .replace(/\-\-+/g, '-')         // Replace multiple - with single -
    .replace(/^-+/, '')             // Trim - from start of text
    .replace(/-+$/, '');            // Trim - from end of text
}