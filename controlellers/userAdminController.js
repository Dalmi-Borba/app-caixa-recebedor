const User = require('../models/user');

exports.list = async (req, res) => {
  const users = await User.find({}, 'name email role createdAt').sort({ createdAt: -1 }).lean();
  res.render('admin/users_list.ejs', { users, flash: req.query.msg || null });
};

exports.getNew = (req, res) => {
  res.render('admin/users_form.ejs', { mode: 'create', userDoc: null, error: null });
};

exports.postCreate = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password) {
      return res.render('admin/users_form.ejs', { mode: 'create', userDoc: null, error: 'Preencha nome, e-mail e senha.' });
    }
    const exists = await User.findOne({ email });
    if (exists) {
      return res.render('admin/users_form.ejs', { mode: 'create', userDoc: null, error: 'E-mail já cadastrado.' });
    }
    const u = new User({ name, email, role: role === 'admin' ? 'admin' : 'user' });
    await u.setPassword(password);
    await u.save();
    res.redirect('/admin/users?msg=criado');
  } catch (err) {
    console.error(err);
    res.render('admin/users_form.ejs', { mode: 'create', userDoc: null, error: 'Erro ao criar usuário.' });
  }
};

exports.getEdit = async (req, res) => {
  const userDoc = await User.findById(req.params.id).lean();
  if (!userDoc) return res.status(404).send('Usuário não encontrado');
  res.render('admin/users_form.ejs', { mode: 'edit', userDoc, error: null });
};

exports.postUpdate = async (req, res) => {
  const { name, email, role, password } = req.body;
  const u = await User.findById(req.params.id);
  if (!u) return res.status(404).send('Usuário não encontrado');
  u.name = name || u.name;
  u.email = email || u.email;
  u.role = role === 'admin' ? 'admin' : 'user';
  if (password && password.trim()) await u.setPassword(password);
  await u.save();
  res.redirect('/admin/users?msg=atualizado');
};

exports.postDelete = async (req, res) => {
  const { id } = req.params;

  // impedir excluir a si mesmo
  if (req.user && req.user._id.toString() === id) {
    return res.status(400).send('Você não pode excluir a si mesmo.');
  }

  const u = await User.findById(id);
  if (!u) return res.redirect('/admin/users?msg=nao-encontrado');

  // impedir excluir o último admin
  if (u.role === 'admin') {
    const admins = await User.countDocuments({ role: 'admin' });
    if (admins <= 1) return res.status(400).send('Não é possível excluir o último admin.');
  }

  await User.findByIdAndDelete(id);
  res.redirect('/admin/users?msg=excluido');
};
