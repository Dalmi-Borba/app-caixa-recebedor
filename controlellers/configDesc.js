const descModel = require('../models/config_descricao');

exports.postConfig = async function(req, res){
    const obj = {
        desc: req.body.desc,
    }
    await descModel.create(obj, (err, item) => {
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
    if(!req.body.desc) return res.render('404');

    const obj = {
        desc: req.body.desc,
    }

    await descModel.findByIdAndUpdate(req.body.id, obj);
    
    res.redirect('/config');
};

exports.deleteConfig = async function(req, res) {
  if (!req.params.id) return res.status(400).json({ success: false, message: 'ID não informado.' });

  try {
    const doc = await descModel.findByIdAndRemove({ _id: req.params.id });

    if (!doc) return res.status(404).json({ success: false, message: 'Descrição não encontrada.' });

    res.json({ success: true });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Erro interno.' });
  }
};