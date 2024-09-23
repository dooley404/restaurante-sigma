const express = require("express");
const router = express.Router();
const { Pratos } = require("../models/db");


router.get("/", (req, res) => {
  Pratos.findAll().then((prato) => {
    res.render("pratos", {
      dados: prato.map((p) => ({
        nome: p.nome,
        descricao: p.descricao,
        preco: p.preco,
        imagem: p.imagem,
        ingredientes: p.ingredientes,
        id: p.id,
      })),
    });
  });
});

router.get("/criar", (req, res) => {
  res.render("criarpratos");
});

router.post("/criar", (req, res) => {
  const { nome, descricao, preco, imagem, ingredientes } = req.body;
  Pratos.create({
    nome,
    descricao,
    preco,
    imagem,
    ingredientes,
  })
    .then(() => {
      res.redirect("/pratos");
    })
    .catch((err) => {
      console.error(err);
      res.redirect("/pratos");
    });
});

router.get("/editar/:id", (req, res) => {
  const idPrato = req.params.id;

  Pratos.findByPk(idPrato).then((prato) => {
    if (prato) {
      res.render("editarprato", {
        prato: {
          id: prato.id,
          nome: prato.nome,
          descricao: prato.descricao,
          preco: prato.preco,
          imagem: prato.imagem,
          ingredientes: prato.ingredientes,
        },
      });
    } else {
      res.redirect("/pratos");
    }
  });
});

router.post("/editar/:id", (req, res) => {
  const pratoId = req.params.id;
  const { nome, descricao, preco, imagem, ingredientes } = req.body;

  Pratos.update(
    {
      nome: nome,
      descricao: descricao,
      preco: preco,
      imagem: imagem,
      ingredientes: ingredientes,
    },
    {
      where: { id: pratoId },
    }
  )
    .then(() => {
      res.redirect("/pratos");
    })
    .catch((err) => {
      console.error(err);
      res.redirect("/pratos");
    });
});

router.get("/deletar/:id", (req, res) => {
  const idPrato = req.params.id;

  Pratos.findByPk(idPrato).then((prato) => {
    res.render("deletarprato", {
      prato: {
        nome: prato.nome,
        id: prato.id,
      },
    });
  });
});

router.post("/deletar/:id", (req, res) => {
  const idPrato = req.params.id;

  Pratos.destroy({
    where: {
      id: idPrato
    }
  }).then(()=>{
    res.redirect("/pratos")
  }).catch((err)=>{
    console.error(err)
    res.redirect("/pratos")
  });
});

module.exports = router;
