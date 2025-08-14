const express = require('express');
const route = express.Router();
const upload = require('./multer');

// --- Auth / RBAC ---
const passport = require('./auth/passport');
const ensureAuth = require('./middleware/ensureAuth');
const ensureRole = require('./middleware/ensureRole');
const ensurePasswordChange = require('./middleware/ensurePasswordChange');
const User = require('./models/user');

// --- Controllers ---
const uploadController      = require('./controlellers/uploadController');
const loteController        = require('./controlellers/loteController');
const mergeController       = require('./controlellers/mergeController');
const configBancController  = require('./controlellers/configBanc');
const configDescController  = require('./controlellers/configDesc');
const filtroController      = require('./controlellers/filtros');
const configDeptoController = require('./controlellers/configDepto');
const accountController     = require('./controlellers/accountController');
const userAdminController   = require('./controlellers/userAdminController');
const uploadRecibosController = require('./controlellers/uploadRecibos');
const estornarController = require('./controlellers/estornoLote');

// ===== Rotas públicas de AUTENTICAÇÃO =====
route.get('/login', (req, res) => {
  res.render('login.ejs', { error: req.query.err ? 'Login ou senha inválidos' : null, query: req.query });
});

route.post('/login',
  passport.authenticate('local', { failureRedirect: '/login?err=1' }),
  (req, res) => {
    const nextUrl = req.query.next || '/';
    res.redirect(nextUrl);
  }
);

route.post('/logout', (req, res, next) => {
  req.logout(err => {
    if (err) return next(err);
    res.redirect('/login');
  });
});

// Criar primeiro admin (opcional). Remova após uso se quiser.
route.get('/setup-first-user', async (req, res) => {
  const exists = await User.exists({});
  if (exists) return res.status(403).send('Já existe usuário.');
  res.render('firstUser.ejs');
});

route.post('/setup-first-user', async (req, res) => {
  const exists = await User.exists({});
  if (exists) return res.status(403).send('Já existe usuário.');
  const { name, email, password } = req.body;
  const u = new User({ name, email, role: 'admin', mustChangePassword: false });
  await u.setPassword(password);
  await u.save();
  res.redirect('/login');
});

// ===== A PARTIR DAQUI: LOGIN OBRIGATÓRIO =====
route.use(ensureAuth);

// Troca de senha (disponível mesmo quando mustChangePassword = true)
route.get('/password-change', accountController.passwordChangeForm);
route.post('/password-change', accountController.passwordChangePost);

// ===== DAQUI PRA BAIXO: EXIGE TER TROCADO A SENHA =====
route.use(ensurePasswordChange);

// ===== Admin: gerenciamento de usuários =====
route.get('/admin/users',             ensureRole('admin'), userAdminController.list);
route.get('/admin/users/new',         ensureRole('admin'), userAdminController.getNew);
route.post('/admin/users',            ensureRole('admin'), userAdminController.postCreate);
route.get('/admin/users/:id/edit',    ensureRole('admin'), userAdminController.getEdit);
route.post('/admin/users/:id',        ensureRole('admin'), userAdminController.postUpdate);
route.post('/admin/users/:id/delete', ensureRole('admin'), userAdminController.postDelete);

// ===== Suas rotas existentes (protegidas) =====
route.post('/doc', uploadController.renderDoc);
route.get('/', uploadController.renderIndex);
route.get('/pessoa', uploadController.renderFormPessoa);
route.get('/cartao', uploadController.renderFormCartao);
route.get('/igreja', uploadController.renderFormIgreja);
route.get('/func', uploadController.renderFormFunc);
route.get('/caixa', uploadController.renderFormCaixa);
route.get('/view', uploadController.getRec);

route.post('/', upload.single('image'), uploadController.postImage);
route.post('/postcaixa', uploadController.postCaixa);
route.get('/delete/:id', uploadController.delete);
route.get('/aprovacoes', uploadController.getAprov);
route.post('/lotes', uploadController.renderLotes);
route.get('/update/:id', uploadController.update);
route.get('/teste', uploadController.renderAp);

// config-banc
route.get('/config', configBancController.renderConfig);
route.post('/config-banc', configBancController.postConfig);
route.put('/config-banc/:id', configBancController.updateConfig);
route.delete('/config-banc/:id', configBancController.deleteConfig);

// config-desc
route.post('/config-desc', configDescController.postConfig);
route.put('/config-desc/:id', configDescController.updateConfig);
route.delete('/config-desc/:id', configDescController.deleteConfig);

// config-depto
route.post('/config-depto', configDeptoController.postConfig);
route.put('/config-depto/:id', configDeptoController.updateConfig);
route.delete('/config-depto/:id', configDeptoController.deleteConfig);

// movimentos
route.get('/movimentos', loteController.renderLotes);
route.post('/lotes-remove/:id', loteController.removeItemLotes);
route.post('/lotes-new', loteController.postLote);

// filtros
route.get('/filtrar', filtroController.renderFiltros);
route.post('/filtrar', filtroController.postFiltros);

// merge pdf
route.post('/merge', mergeController.merge_pdf);

// upload recibos
route.post('/upload-recibos', upload.single('recibos'), uploadRecibosController.uploadRecibos);

//estornar
route.get('/estornar/:id', estornarController.estornar);

module.exports = route;
