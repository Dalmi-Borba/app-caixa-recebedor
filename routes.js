const express = require('express');
const route = express.Router();
const upload = require('./multer')

const uploadController = require('./controlellers/uploadController');
const loteController = require('./controlellers/loteController');
const mergeController = require('./controlellers/mergeController');
//const updateController = require('./controlellers/updateController');

route.get('/down', uploadController.renderDown);
route.post('/doc', uploadController.renderDoc);
route.get('/', uploadController.renderIndex);
route.get('/pessoa', uploadController.renderFormPessoa);
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

//config
route.get('/config', uploadController.renderConfig);
route.post('/config', uploadController.postConfig);
route.put('/config/:id', uploadController.updateConfig);
route.delete('/config/:id', uploadController.deleteConfig);

route.get('/movimentos', loteController.renderLotes);
route.post('/lotes-new', loteController.postLote);

//merge pdf
route.post('/merge', mergeController.merge_pdf);

module.exports = route;