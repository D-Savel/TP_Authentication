export default function isAuthenticated(req, res, next) {
  if (req.session?.auth) {
    next();
    return;
  }
  console.log('Error: you are not log');
  res.redirect("/login");
}