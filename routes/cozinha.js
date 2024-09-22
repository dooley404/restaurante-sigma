const express = require("express");
const router = express.Router();
const { Pedidos } = require("../models/db");

router.get("/", (req, res) => {
  Pedidos.findAll().then((pedidos) => {
    res.render("cozinha", {
      pedidos: pedidos.map((p) => ({
        nome: p.nome,
        descricao: p.descricao,
        preco: p.preco,
      })),
    });
  });
});

module.exports = router;
