var mongoose = require('mongoose');
 
var bancSchema = new mongoose.Schema({
    conta: String,
});
 
//Image is a model which has a schema imageSchema
 
module.exports = new mongoose.model('Banc', bancSchema);