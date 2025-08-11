const deptoModel = require('../models/config_depto');

exports.postConfig = async function(req, res){
    const obj = {
        nun_depto: req.body.nun_depto,
        nome_depto: req.body.nome_depto,
    }
    await deptoModel.create(obj, (err, item) => {
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
    if(!req.body.nun_depto) return res.render('404');
    if(!req.body.nome_depto) return res.render('404');

    const obj = {
        nun_depto: req.body.nun_depto,
        nome_depto: req.body.nome_depto,
    }

    await deptoModel.findByIdAndUpdate(req.body.id, obj);
    
    res.redirect('/config');
};

exports.deleteConfig = async function(req, res) {
  if (!req.params.id) return res.status(400).json({ success: false, message: 'ID não informado.' });

  try {
    const doc = await deptoModel.findByIdAndRemove({ _id: req.params.id });

    if (!doc) return res.status(404).json({ success: false, message: 'Descrição não encontrada.' });

    res.json({ success: true });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Erro interno.' });
  }
};