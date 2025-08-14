module.exports = function ensureRole(role) {
  return function (req, res, next) {
    if (!req.isAuthenticated || !req.isAuthenticated()) {
      return res.redirect('/login?next=' + encodeURIComponent(req.originalUrl || '/'));
    }
    if (!req.user || req.user.role !== role) {
      return res.status(403).send('Acesso negado');
    }
    next();
  };
};
