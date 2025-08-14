module.exports = (req, res, next) => {
  // Só checa se está logado
  if (!req.isAuthenticated || !req.isAuthenticated()) return next();

  // Se não precisa trocar, segue
  if (!req.user || req.user.mustChangePassword !== true) return next();

  const url = req.path || '';

  // Rotas/arquivos liberados enquanto estiver pendente de troca
  const allowed =
    url === '/password-change' ||
    url === '/login' ||
    url === '/logout' ||
    url.startsWith('/public/');

  if (!allowed) {
    return res.redirect('/password-change?next=' + encodeURIComponent(req.originalUrl || '/'));
  }

  next();
};
