const express = require("express");
const router = express.Router();
const {Pedidos } = require("../models/db");

router.get("/", (req, res)=>{
  res.render("garcom")
})

router.post("/criarpedido", (req, res)=>{
  const {nome, descricao, preco} =  req.body

  Pedidos.create({
    nome: nome,
    descricao: descricao,
    preco: preco
  })
  

  res.redirect("/")
})

module.exports = router;