import mongoose from 'mongoose'
import { UserModel } from '../Models/User.js'
import argon2 from 'argon2'

export function loginFormController(req, res) {
  res.render("login");
}

export async function loginController(req, res) {

  const { email, password } = req.body;

  if (email.trim() === "" || password.trim() === "") {
    if (email.trim() === "")
      req.flash('failure', 'Email required !');
    if (password.trim() === "")
      req.flash('failure', 'Password required !');
    res.redirect('/login');
    return
  }


  try {
    await mongoose.connect(process.env.MONGO_TP_USERS_URL);
    const user = await UserModel.findOne({ email })
    if (user?.email === email && await argon2.verify(user.password, password)) {
      req.session.auth = true;
      req.flash('success', `You are logged, welcome ${user.firstName}`);
      res.redirect('/dashboard')
    } else {
      req.flash('failure', `Invalid email or password`);
      req.flash('failure', `Please try again !`);
      res.redirect('/login')
    }
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message })
  }
}

