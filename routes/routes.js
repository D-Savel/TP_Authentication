import express from "express";
const router = express.Router();

import { loginFormController, loginController } from "../controllers/login.js";
import DashboardController from "../controllers/dashboard.js";
import { userFormController, userRegisterController } from "../controllers/home.js"

router.get("/", userFormController);
router.post("/", userRegisterController);
router.get("/login", loginFormController);
router.post("/login", loginController);
router.get("/dashboard", DashboardController);

export default router;
