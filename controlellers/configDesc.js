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
    if(!req.params.id) return res.render('404');
 
    const doc = await descModel.findByIdAndRemove({ _id: req.params.id});
    if(!doc) return res.render('404');

    res.redirect('/config');
};