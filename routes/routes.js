import express from "express";
const router = express.Router();

import { loginFormController, loginController } from "../controllers/login.js";
import DashboardController from "../controllers/dashboard.js";
import { userFormController, userRegisterController } from "../controllers/home.js"
import SessionDestroy from "../controllers/sessionDestroy.js";


import isAuthenticated from "../middlewares/auth.js";

router.get("/", userFormController);
router.post("/", userRegisterController);
router.get("/login", loginFormController);
router.post("/login", loginController);
router.get("/dashboard", isAuthenticated, DashboardController);
router.get("/sessionDestroy", SessionDestroy)

export default router;
