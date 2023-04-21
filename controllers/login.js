import mongoose from 'mongoose'
import { UserModel } from '../Models/User.js'
import argon2 from 'argon2'

export function loginFormController(req, res) {
  res.render("login");
}

export async function loginController(req, res) {
  const { email, password } = req.body;
  try {
    await mongoose.connect(process.env.MONGO_TP_USERS_URL);
    const user = await UserModel.findOne({ email })
    if (user.email === email && await argon2.verify(user.password, password)) {
      console.log('session auth');
      req.session.auth = true;
      res.redirect('/dashboard')
    }
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message })
  }
}

