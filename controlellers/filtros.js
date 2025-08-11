const imgModel = require('../models/model');

exports.renderFiltros = async function(req, res){
   res.render('filtros.ejs', { items: [] });
};

exports.postFiltros = async function (req, res) {
    const { lote, flag, data, nome, material, depto, valor, obs } = req.body;

    // objeto de filtros só com campos preenchidos
    const filtros = {};
    if (lote) filtros.nun_lote = new RegExp(lote, 'i'); // busca parcial, case-insensitive
    if (flag) filtros.flag = new RegExp(flag, 'i');
    if (data) filtros.data = data;
    if (nome) filtros.nome = new RegExp(nome, 'i');
    if (material) filtros.material = new RegExp(material, 'i');
    if (depto) filtros.nome_depto = new RegExp(depto, 'i');
    if (valor) filtros.valor = new RegExp(valor, 'i');
    if (obs) filtros.obs = new RegExp(obs, 'i');

    try {
        const filtrados = await imgModel.find(filtros);
        res.render('filtros.ejs', { items: filtrados });
    } catch (err) {
        console.error(err);
        res.status(500).send('Erro ao buscar dados');
    }
};
