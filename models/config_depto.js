var mongoose = require('mongoose');
 
var deptoSchema = new mongoose.Schema({
    nun_depto: String,
    nome_depto: String,
});
 
//Image is a model which has a schema imageSchema
 
module.exports = new mongoose.model('Depto', deptoSchema);