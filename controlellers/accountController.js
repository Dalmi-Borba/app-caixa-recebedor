const User = require('../models/user');

exports.passwordChangeForm = (req, res) => {
  res.render('password_change.ejs', { error: null, query: req.query });
};

exports.passwordChangePost = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!newPassword || newPassword.length < 8) {
      return res.render('password_change.ejs', { error: 'A nova senha deve ter ao menos 8 caracteres.', query: req.query });
    }

    const u = await User.findById(req.user._id);
    if (!u) return res.status(404).send('Usuário não encontrado');

    // Exigir senha atual (recomendado)
    const ok = await u.validatePassword(currentPassword || '');
    if (!ok) {
      return res.render('password_change.ejs', { error: 'Senha atual incorreta.', query: req.query });
    }

    await u.setPassword(newPassword);
    u.mustChangePassword = false;
    u.passwordChangedAt = new Date();
    await u.save();

    const nextUrl = req.query.next || '/';
    res.redirect(nextUrl);
  } catch (e) {
    console.error(e);
    res.render('password_change.ejs', { error: 'Erro ao trocar a senha.', query: req.query });
  }
};
