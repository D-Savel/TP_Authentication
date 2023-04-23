export default function isAuthenticated(req, res, next) {
  if (req.session?.auth) {
    next();
    return;
  }
  const errorMessage = "You must be logged to access Dashboard !";
  res.render("login", { errorMessage });
}
