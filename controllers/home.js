import dotenv from 'dotenv';
import mongoose from 'mongoose'
import { UserModel } from '../Models/User.js'
import argon2 from "argon2";

dotenv.config();

export function userFormController(req, res) {

  const user = req.query

  if (req.session?.auth) {
    const isLogged = true
    res.render("home", { isLogged, user });
  } else {
    const isLogged = false
    res.render("home", { isLogged, user });
  }

}

export async function userRegisterController(req, res) {
  const { firstName, lastName, email, password, password_confirm } = req.body;
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  if (firstName.trim() === ""
    || lastName.trim() === ""
    || email.trim() === ""
    || password.trim() === ""
    || password_confirm.trim() === ""
  ) {
    if (firstName.trim() === "")
      req.flash('failure', 'First name required !');
    if (lastName.trim() === "")
      req.flash('failure', 'Last name required !');
    if (email.trim() === "")
      req.flash('failure', 'Email required !');
    if (password.trim() === "")
      req.flash('failure', 'Password required !');
    if (password_confirm.trim() === "")
      req.flash('failure', 'Confirm password required !');
    res.redirect(`/?firstName=${encodeURIComponent(firstName)}&lastName=${encodeURIComponent(lastName)}&email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}&password_confirm=${encodeURIComponent(password_confirm)}`);
    return
  }

  if (!email.match(emailRegex)) {
    req.flash('failure', "Invalid email !");
    res.redirect(`/?firstName=${encodeURIComponent(firstName)}&lastName=${encodeURIComponent(lastName)}&email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}&password_confirm=${encodeURIComponent(password_confirm)}`);
    return
  }

  if (password !== password_confirm) {
    req.flash('failure', "Confirmation password and password doesn't match !");
    res.redirect(`/?firstName=${encodeURIComponent(firstName)}&lastName=${encodeURIComponent(lastName)}&email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}&password_confirm=${encodeURIComponent(password_confirm)}`);
    return
  }


  try {
    await mongoose.connect(process.env.MONGO_TP_USERS_URL);
    const user = await UserModel.findOne({ email })
    if (!user) {
      const hash = await argon2.hash(password);
      const user = { firstName, lastName, email, password: hash }
      await UserModel.insertMany(user);
      console.log({ status: 'user registered', mail: user.email });
      req.flash('success', `You are registered, welcome ${user.firstName}`);
      res.redirect('/login')
    } else {
      req.flash('failure', "This user already exists !");
      res.redirect("/");
    }
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message })
  }
}