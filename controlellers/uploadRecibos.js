const recibosModel = require('../models/recibos');
const imgModel = require('../models/model');
const convert = require('../convert');

exports.uploadRecibos = async function(req, res, next) {
  // validações básicas
  if (!req.body.lote) return res.status(400).send('Lote é obrigatório');
  if (!req.file)      return res.status(400).send('Arquivo é obrigatório');

  // opcional: validar formato MM-AAAA (aceita 1-9 com/sem zero à esquerda)
  const rxMesAno = /^(0?[1-9]|1[0-2])-\d{4}$/;
  if (!rxMesAno.test(req.body.lote)) {
    return res.status(400).send('Lote inválido. Use MM-AAAA, ex: 8-2025');
  }

  const nun_lote = req.body.lote;
  const nome_arquivo = req.body.lote;

  try {
    const doc = await recibosModel.findOneAndUpdate(
      { nun_lote },                               // filtro (chave)
      { $set: { nun_lote, nome_arquivo } },       // atualização
      {
        upsert: true,         // cria se não existir
        new: true,            // retorna o doc atualizado
        setDefaultsOnInsert: true
      }
    );

    // 2) marcar todos os itens daquele lote em UMA chamada
    const result = await imgModel.updateMany(
      { nun_lote },
      { $set: { arquivo_recibo: true } }
    );

    convert(req.file.mimetype, nome_arquivo);

    return res.redirect('/movimentos');
    
  } catch (err) {
    console.error(err);
    return res.status(500).send('Erro ao salvar recibo');
  }
};
