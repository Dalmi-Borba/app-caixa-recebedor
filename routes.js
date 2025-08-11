const express = require('express');
const route = express.Router();
const upload = require('./multer')

const uploadController = require('./controlellers/uploadController');
const loteController = require('./controlellers/loteController');
const mergeController = require('./controlellers/mergeController');
const configBancController = require('./controlellers/configBanc');
const configDescController = require('./controlellers/configDesc');
const filtroController = require('./controlellers/filtros');
const configDeptoController = require('./controlellers/configDepto');
//const updateController = require('./controlellers/updateController');

route.get('/down', uploadController.renderDown);
route.post('/doc', uploadController.renderDoc);
route.get('/', uploadController.renderIndex);
route.get('/pessoa', uploadController.renderFormPessoa);
route.get('/cartao', uploadController.renderFormCartao);
route.get('/igreja', uploadController.renderFormIgreja);
route.get('/func', uploadController.renderFormFunc);
route.get('/caixa', uploadController.renderFormCaixa);
route.get('/view', uploadController.getRec);
route.post('/',upload.single('image'), uploadController.postImage);
route.post('/postcaixa', uploadController.postCaixa);
route.get('/delete/:id', uploadController.delete);
route.get('/del/:id', uploadController.del);
route.get('/aprovacoes', uploadController.getAprov);
route.post('/lotes', uploadController.renderLotes); //get
route.get('/update/:id', uploadController.update);
route.get('/anexos',uploadController.renderAnexos);
route.get('/teste',uploadController.renderAp);

//config-banc
route.get('/config', configBancController.renderConfig);
route.post('/config-banc', configBancController.postConfig);
route.put('/config-banc/:id', configBancController.updateConfig);
route.delete('/config-banc/:id', configBancController.deleteConfig);

//config-desc
route.post('/config-desc', configDescController.postConfig);
route.put('/config-desc/:id', configDescController.updateConfig);
route.delete('/config-desc/:id', configDescController.deleteConfig);

//config-depto
route.post('/config-depto', configDeptoController.postConfig);
route.put('/config-depto/:id', configDeptoController.updateConfig);
route.delete('/config-depto/:id', configDeptoController.deleteConfig);

//movimentos
route.get('/movimentos', loteController.renderLotes);
route.post('/lotes-remove/:id', loteController.removeItemLotes);

route.post('/lotes-new', loteController.postLote);

//filtros
route.get('/filtrar', filtroController.renderFiltros);
route.post('/filtrar', filtroController.postFiltros);

//merge pdf
route.post('/merge', mergeController.merge_pdf);

module.exports = route;