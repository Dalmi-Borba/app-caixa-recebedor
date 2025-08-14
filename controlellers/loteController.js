const imgModel = require('../models/model');

exports.renderLotes = async function(req, res) {
    try {
        const items = await imgModel.find({
            nun_lote: { $nin: [null, ""] },
            arquivo_recibo: false // garante que só traga os não recebidos
        })
        .sort({ nun_lote: -1 })
        .exec();

        res.render('movimentos.ejs', { items });
    } catch (err) {
        console.error(err);
        res.status(500).send('Erro ao buscar lotes');
    }
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


exports.removeItemLotes = async function(req, res) {
    if (!req.params.id) return res.status(400).json({ success: false, message: 'ID não informado.' });

    const obj = {
        nun_lote: '',
    }

    const doc = await imgModel.findByIdAndUpdate(req.params.id, obj);

    if (!doc) return res.status(404).json({ success: false, message: 'Item não encontrado.' });

    res.json({ success: true });  
};