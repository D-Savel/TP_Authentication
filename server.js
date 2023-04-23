import dotenv from "dotenv";
import express from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";
import session from "express-session";
import MongoStore from 'connect-mongo';
import flash from "connect-flash"
import route from "./routes/routes.js";

// ==========
// App initialization
// ==========

dotenv.config();
const { APP_HOSTNAME, APP_PORT, NODE_ENV, APP_SECRET, MONGO_SESSIONS_URL } = process.env;
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();

app.set("view engine", "pug");
app.locals.pretty = (NODE_ENV !== 'production'); // Indente correctement le HTML envoyé au client (utile en dev, mais inutile en production)

// ==========
// App middlewares
// ==========

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: false }));
app.use(session({
  name: 'authentication-project',
  secret: APP_SECRET,
  resave: true,
  saveUninitialized: true,
  store: MongoStore.create({ mongoUrl: MONGO_SESSIONS_URL }),
  cookie: { maxAge: 180 * 60 * 1000 } // on détermine la durée de vie de la session
}));

app.use(flash());

app.use((req, res, next) => {
  res.locals.flash_success = req.flash("success"); // Consomme les messages flash
  res.locals.flash_failure = req.flash("failure");
  next();
});


// ==========
// App routers
// ==========

app.use("/", route);

// ==========
// App start
// ==========

app.listen(APP_PORT, () => {
  console.log(`App listening at http://${APP_HOSTNAME}:${APP_PORT}`);
});
