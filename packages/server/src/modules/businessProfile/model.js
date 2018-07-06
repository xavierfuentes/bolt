const mongoose = require('mongoose');

// create a schema
const businessProfileSchema = new mongoose.Schema({
  company: {
    name: String,
    businessType: String,
    registrationNumber: String,
    sic: { code: String, description: String },
    // address: {
    //   registered: {
    //     label: String,
    //   },
    //   trading: {},
    //   correspondence: {},
    // },
  },
  // individuals: [],
  // shareholders: [],

  // company: {
  //   name: businessName,
  //   type: businessType.value,
  //   number: registrationNumber,
  //   sic: { code: sicCode.code, description: sicCode.value },
  //   address: {
  //     registered: { ...registrationAddress, label: 'Registered' },
  //     trading: { ...tradingAddress, label: 'Trading' },
  //     correspondence: { ...correspondenceAddress, label: 'Correspondence' },
  //   },
  // },
  // individuals: getIndividuals(permissions),
  // shareholders: {},
});

// the schema is useless so far
// we need to create a model using it
module.exports = mongoose.model('BusinessProfile', businessProfileSchema, 'profiles');
