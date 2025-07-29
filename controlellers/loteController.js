const imgModel = require('../models/model');

exports.renderLotes = async function(req, res){
    //pegar todos os itens com lote
    await imgModel.find({nun_lote: { $nin: [null, ""] }}).sort({nome: 1}).exec(function(err, items){
        if (err) {
            console.log(err);
            res.status(500).send('An error occurred', err);
        }
        else {
            res.render('movimentos.ejs', { items: items });
        }
    });
};

exports.postLote = async function(req, res, next){
    //pegar os IDs marcados e atualiza os items com o numero do lote
    const lote = req.body.lote;
    const ids = req.body.checkinput.split(",");
    
    for(let i = 0; i < ids.length; i++){
        const item = await imgModel.findByIdAndUpdate(ids[i], { nun_lote: lote });
        if(!item) return res.render('404');
    }
    res.redirect('/view');
};