const express = require("express");
const router = express.Router();
const { Pedidos, Pratos } = require("../models/db");

router.get("/", (req, res) => {
  Pratos.findAll().then((pratos)=>{
    res.render("garcom", {prato: pratos.map((p)=>({
      nome:p.nome
    }))});
  })

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
