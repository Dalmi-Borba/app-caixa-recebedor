module.exports = function ensureAuth(req, res, next) {
  if (req.isAuthenticated && req.isAuthenticated()) return next();
  res.redirect('/login?next=' + encodeURIComponent(req.originalUrl || '/'));
};
