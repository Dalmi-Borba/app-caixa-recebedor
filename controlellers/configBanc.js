const bancModel = require('../models/config_banc');
const descModel = require('../models/config_descricao');
const deptoModel = require('../models/config_depto');

exports.renderConfig = async function(req, res){
 // get all desc e banc
   const banc = await bancModel.find().exec();
   const desc = await descModel.find().exec();
   const depto = await deptoModel.find().exec();
   res.render('config.ejs', { contas: banc, desc: desc, depto: depto });
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
  if (!req.params.id) return res.status(400).json({ success: false, message: 'ID não informado.' });

  try {
    const doc = await bancModel.findByIdAndRemove({ _id: req.params.id });

    if (!doc) return res.status(404).json({ success: false, message: 'Conta não encontrada.' });

    res.json({ success: true });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Erro interno.' });
  }
};
