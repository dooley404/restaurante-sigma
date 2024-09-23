const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const handlebars = require("express-handlebars");
const { Sequelize, sequelize, Pedidos } = require("./models/db");

//import rotas
const cozinha = require("./routes/cozinha");
const garcom = require("./routes/garcom");
const prato = require("./routes/prato")

//config
//bodyParser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); //passar para json

//handlebars
app.engine("handlebars", handlebars.engine({ defaultLayout: "main" }));
app.set("view engine", "handlebars");


//rotas
app.use("/cozinha", cozinha);
app.use("/garcom", garcom);
app.use("/pratos", prato)

app.get("/", (req, res) => {
  res.render("home", { nome: "vitor" });
});

app.listen(8000, () => {
  console.log("aberto na porta 8000");
});
