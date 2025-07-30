var mongoose = require('mongoose');
 
var imageSchema = new mongoose.Schema({
    nome: String,
    tipo: String,
    aprovacao: String,
    mat_ins: String,
    material: String,
    depto: String,
    valor: String,
    data: String,
    obs: String,
    nun_lote: String,
    conta: String,
    vda: String,
    nun_parcela: String,
    tipo_cartao: String,
    flag: String,
    img:
    {
        name: String,
        data: Buffer,
        contentType: String
    }
});
 
//Image is a model which has a schema imageSchema
 
module.exports = new mongoose.model('Image', imageSchema);