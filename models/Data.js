const mongoose = require('mongoose'),
  Schema = mongoose.Schema;

// create a schema
const dataSchema = new Schema({
  name: String,
  slug: {
    type: String,
    unique: true
  },
  description: String
});

dataSchema.pre('save', function(next) {
  this.slug = slugify(this.name);
  next();
});

const dataModel = mongoose.model('Data', dataSchema);

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