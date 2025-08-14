var mongoose = require('mongoose');
 
var imageSchema = new mongoose.Schema({
    nome: String, //favorecido - nome que vai no recibo
    tipo: String, //pix cartão ou debitos
    aprovacao: String, // deprecated
    mat_ins: String, //recebe o valor se é mat ou ins
    material: String, //material do item
    depto: String, //nome do departamento
    nome_depto: String,
    valor: String,
    data: String,
    obs: String,
    nun_lote: String,
    conta: String,
    vda: String,
    nun_parcela: String,
    tipo_cartao: String,
    flag: String,
    user: String,
    arquivo_recibo: String,//true ou false
    img:
    {
        name: String,
        data: Buffer,
        contentType: String
    }
});
 
//Image is a model which has a schema imageSchema
 
module.exports = new mongoose.model('Image', imageSchema);