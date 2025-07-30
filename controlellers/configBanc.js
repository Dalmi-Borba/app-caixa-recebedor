const bancModel = require('../models/config_banc');
const descModel = require('../models/config_descricao');

exports.renderConfig = async function(req, res){
 // get all desc e banc
   const banc = await bancModel.find().exec();
   const desc = await descModel.find().exec();
   res.render('config.ejs', { contas: banc, desc: desc });
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
