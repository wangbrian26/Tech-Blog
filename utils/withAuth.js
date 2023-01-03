const withAuth = (req, res, next) => {
  if (!req.session.loggedIn) {
    res.redirect("/login");
  } else {
    next();
  }
};

const withUserAuth = (req, res, next) => {
  if (!req.session.user) {
    res.redirect("")
  }
}
module.exports = withAuth;
