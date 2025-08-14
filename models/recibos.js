var mongoose = require('mongoose');
 
var recibosSchema = new mongoose.Schema({
    nun_lote: String,
    nome_arquivo: String,
});
 
//Image is a model which has a schema imageSchema
 
module.exports = new mongoose.model('Recibos', recibosSchema);