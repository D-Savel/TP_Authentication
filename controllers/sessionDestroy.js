export default function sessionDestroy(req, res) {
  if (req?.session.auth) {
    req.session.destroy((err) => {
      const errorMessage = "You have been unlogged";
      res.render("login", { errorMessage });
      if (err) {
        res.status(500).json({ error: err.message })
      }
    });
  } else {
    res.redirect('/login')
  }
}