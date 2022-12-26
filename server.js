const express = require("express");
const { join } = require("path");
const session = require("express-session");
const exphbs = require("express-handlebars");
const helpers = require("./utils/helpers.js");

const app = express();
const PORT = process.env.PORT || 3001;

const sequelize = require("./config/connection.js");
const SequelizeStore = require("connect-session-sequelize")(session.Store);

const sess = {
  secret: "secret",
  cookie: {
    maxAge: 1000 * 60 * 60,
    httpOnly: true,
    secure: false,
    sameSite: "strict",
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(join(__dirname, "public")));

app.use(require("./controller"));

app.listen(PORT, () => {
  console.log("Server is now open.");
  sequelize.sync({ force: false });
});
