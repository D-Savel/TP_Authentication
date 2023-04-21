export default function sessionDestroy(req, res) {
  console.log('route', '/sessionDestroy');
  req.session.destroy((err) => {
    res.redirect('/login')
    if (err) {
      res.status(500).json({ error: err.message })
    }
  });
}