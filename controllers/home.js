import dotenv from 'dotenv';
import mongoose from 'mongoose'
import { UserModel } from '../Models/User.js'
import argon2 from "argon2";

dotenv.config();

export function userFormController(req, res) {
  res.render("home");
}

export async function userRegisterController(req, res) {
  const { firstName, lastName, email, password } = req.body;

  try {
    await mongoose.connect(process.env.MONGO_TP_USERS_URL);
    const userExists = await UserModel.findOne({ email })
    console.log(userExists);
    if (!userExists) {
      const hash = await argon2.hash(password);
      const user = { firstName, lastName, email, password: hash }
      await UserModel.insertMany(user);
      console.log({ status: 'user registered', user: user.firstName });
      res.redirect('/login')
    } else {
      res.status(500).json({ status: 'error', message: 'user already exists' })
    }
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message })
  }
}