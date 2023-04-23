export default function dashboard(req, res) {
  const isLogged = true
  res.render("dashboard", { isLogged });
}
