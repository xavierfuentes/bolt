const mongoose = require('mongoose');

// create a schema
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
});

// the schema is useless so far
// we need to create a model using it
module.exports = mongoose.model('User', userSchema, 'users');
