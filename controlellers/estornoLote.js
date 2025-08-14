const imgModel = require('../models/model');

exports.estornar = async function(req, res) {
    const id = req.params.id;
    await imgModel.updateMany({ _id: id }, { $set: { arquivo_recibo: false } });
    res.json({ success: true });
};