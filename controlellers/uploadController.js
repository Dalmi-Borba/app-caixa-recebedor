const imgModel = require('../models/model');
const bancModel = require('../models/config_banc');
const convert = require('../convert');
const delete_js = require('../delete_js');
const zipjs = require('../zip_js')
let path = require('path');
require('dotenv').config();

exports.renderLotes = async function(req, res){
/** 
    await imgModel.find().sort({nome: 1}).exec(function(err, items){
        if (err) {
            console.log(err);
            res.status(500).send('An error occurred', err);
        }
        else {
            res.render('lotes.ejs', { items: items });
        }
    }); 
*/
    let path_public = process.env.PATH_PUBLIC;
    let lote = req.body.lote;
    if(!lote) return res.render('404');
    await imgModel.find({nun_lote: lote}).exec(function(err, items){
        if (err) {
            console.log(err);
            res.status(500).send('An error occurred', err);
        }
        else {
            res.render('lotes.ejs', { items: items, path_public: path_public });
        }
    });
};

exports.renderDown = function(req, res){
    res.download('./zip/nome.zip', function(error){
        //console.log("Error : ", error)
    });
};

exports.renderAnexos = function(req, res){
    res.render('anexos.ejs');
    zipjs(req.params.id);
};

exports.renderFormPessoa = async function(req, res){
    //get all contas banc
    await bancModel.find().exec(function(err, items){
        if (err) {
            console.log(err);
            res.status(500).send('An error occurred', err);
        }
        else {
            res.render('formPessoa.ejs', { items: items }); 
        }
    });
};

exports.renderFormIgreja = function(req, res){
    res.render('formIgreja.ejs'); 
};

exports.renderFormFunc = function(req, res){
    res.render('formFunc.ejs'); 
};

exports.renderFormCaixa = function(req, res){
    res.render('formCaixa.ejs'); 
};

exports.renderIndex = function(req, res){
    res.render('index.ejs'); 
};

exports.getRec = async function(req, res) {
    try {
        const items = await imgModel.find({
            $or: [
                { nun_lote: { $exists: false } },  // campo não existe
                { nun_lote: null },                // campo é null
                { nun_lote: '' }                   // campo é string vazia
            ]
        }).sort({ nome: 1 }).exec();

        res.render('view.ejs', { items });
    } catch (err) {
        console.error(err);
        res.status(500).send('Ocorreu um erro ao buscar os dados.');
    }
};

/** 
exports.renderDoc = async function(req, res){
    await imgModel.findOne({id: req.params.id}).exec(function(err, items){
         if (err) {
             console.log(err);
             res.status(500).send('An error occurred', err);
         }
         else {
            return res.render('doc.ejs', { items });
         }
     }); 
 };
 */

exports.renderAp = async function(req, res){
    await imgModel.find({tipo: 'iasd'}).exec(function(err, items){
        if (err) {
            console.log(err);
            res.status(500).send('An error occurred', err);
        }
        else {
            res.render('teste.ejs', { items: items });
        }
    }); 
};

exports.getAprov = async function(req, res){
    await imgModel.find({tipo: 'iasd'}).exec(function(err, items){
         if (err) {
             console.log(err);
             res.status(500).send('An error occurred', err);
         }
         else {
             res.render('aprovacoes.ejs', { items: items });
         }
     }); 
};
 
exports.getAprovados = async function(req, res){
    await imgModel.find({aprovacao:'true'}).exec(function(err, items){
         if (err) {
             console.log(err);
             res.status(500).send('An error occurred', err);
         }
         else {
             res.render('aprovados.ejs', { items: items });
         }
     }); 
};


exports.postImage = async function(req, res, next){
    var obj = {
        nome: req.body.nome,
        material: req.body.material,
        mat_ins: req.body.mat,
        tipo: req.body.tipo,
        depto: req.body.depto,
        valor: req.body.valor,
        data: req.body.date,
        obs: req.body.obs,
        aprovacao: req.body.aprovacao,
        conta: req.body.conta,
        img: {
            name: req.file.filename,
            //data: fs.readFileSync(path.join('/home/dalmi/Documentos/projetos/multer/uploads/' + req.file.filename)),
            contentType: req.file.mimetype
        }
    }
    imgModel.create(obj, async (err, item) => {
        if (err) {
            console.log(err);
        }
        else {
           convert(req.file.mimetype, req.file.filename);
           return res.redirect('/view')
        }
    });
};

exports.postCaixa = async function(req, res, next){
    var obj = {
        nome: req.body.nome,
        material: req.body.material,
        mat_ins: req.body.mat,
        tipo: req.body.tipo,
        depto: req.body.depto,
        valor: req.body.valor,
        obs: req.body.obs,
    }
    imgModel.create(obj, (err, item) => {
        if (err) {
            console.log(err);
        }
        else {
            // item.save();
           return res.redirect('/view');
        }
    });
};


exports.delete = async function(req, res) {
    if(!req.params.id) return res.render('404');
    //if(!req.params.name) return res.render('404');
  
    const doc = await imgModel.findByIdAndRemove({ _id: req.params.id});
    if(!doc) return res.render('404');

    //delete_js(req.params.name),
  
    res.redirect('/view');
};

exports.del = async function(req, res) {
    if(!req.params.id) return res.render('404');
  
    const doc = await imgModel.findByIdAndRemove({ _id: req.params.id});
    if(!doc) return res.render('404');
  
    res.redirect('/view');
};

exports.update = async function(req, res) {
    if(!req.params.id) return res.render('404');
    const doc = await imgModel.findByIdAndUpdate(req.params.id, {aprovacao: 'true'});
    if(!doc) return res.render('404');

    res.redirect('/');
};

exports.renderDoc = async function(req, res) {
    let obj = {
        nun_lote: req.body.lote,
        nome: req.body.nome,
        material: req.body.material,
        depto: req.body.depto,
        valor: req.body.valor,
        obs: req.body.obs,
    }

    if(!req.body.id) return res.render('404');
    const doc = await imgModel.findByIdAndUpdate(req.body.id, obj);
    if(!doc) return res.render('404');

    res.redirect('/view');
};


exports.renderConfig = async function(req, res){
    //get all contas banc
    await bancModel.find().exec(function(err, items){
        if (err) {
            console.log(err);
            res.status(500).send('An error occurred', err);
        }
        else {
            res.render('config.ejs', { items: items }); 
        }
    });
};


exports.postConfig = async function(req, res){
    // insert conta bancModel
    const obj = {
        conta: req.body.conta,
    }
    await bancModel.create(obj, (err, item) => {
        if (err) {
            console.log(err);
        }
        else {
            // item.save();
            res.redirect('/config');
        }
    });
    
};


exports.updateConfig = async function(req, res) {
    if(!req.body.id) return res.render('404');
    if(!req.body.conta) return res.render('404');

    const obj = {
        conta: req.body.conta,
    }

    await bancModel.findByIdAndUpdate(req.body.id, obj);
    
    res.redirect('/config');
};

exports.deleteConfig = async function(req, res) {
    if(!req.params.id) return res.render('404');
 
    const doc = await bancModel.findByIdAndRemove({ _id: req.params.id});
    if(!doc) return res.render('404');

    res.redirect('/config');
};
