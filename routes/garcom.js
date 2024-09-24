const express = require("express");
const router = express.Router();
const { Pedidos, Pratos } = require("../models/db");

router.get("/", (req, res) => {
  Pratos.findAll({ where: { categoria: "prato" } }).then((pratos) => {
    Pratos.findAll({ where: { categoria: "bebida" } }).then((bebida) => {
      res.render("garcom", {
        prato: pratos.map((p) => ({
          nome: p.nome,
          preco: p.preco,
        })),
        bebida: bebida.map((b) => ({
          nome: b.nome,
          preco: b.preco,
        })),
      });
    });
  });
});

router.post("/criarpedido", (req, res) => {
  const { nome, descricao, preco } = req.body;

  Pedidos.create({
    nome: nome,
    descricao: descricao,
    preco: preco,
  });

  res.redirect("/");
});

module.exports = router;
