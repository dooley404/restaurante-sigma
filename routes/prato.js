const express = require("express");
const router = express.Router();
const { Pratos } = require("../models/db");

router.get("/", (req, res) => {
  Pratos.findAll({ where: { categoria: "prato" } }).then((prato) => {
    Pratos.findAll({ where: { categoria: "bebida" } }).then((bebida) => {
      res.render("pratos", {
        dados: prato.map((p) => ({
          nome: p.nome,
          descricao: p.descricao,
          preco: p.preco,
          imagem: p.imagem,
          ingredientes: p.ingredientes,
          id: p.id,
        })),
        bebidas: bebida.map((b) => ({
          nome: b.nome,
          descricao: b.descricao,
          preco: b.preco,
          imagem: b.imagem,
          ingredientes: b.ingredientes,
          id: b.id,
        })),
      });
    });
  });
});

router.get("/criar", (req, res) => {
  res.render("criarpratos");
});

router.post("/criar", (req, res) => {
  const { nome, descricao, preco, imagem, ingredientes, categoria } = req.body;
  Pratos.create({
    nome,
    descricao,
    preco,
    categoria,
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
    const categoriaAocontrario = prato.categoria === "prato" ? "Bebida": "Prato";

    if (prato) {
      res.render("editarprato", {
        prato: {
          id: prato.id,
          nome: prato.nome,
          descricao: prato.descricao,
          preco: prato.preco,
          categoria: prato.categoria,
          imagem: prato.imagem,
          ingredientes: prato.ingredientes,
          categoriaInvertida: categoriaAocontrario
        },
      });
    } else {
      res.redirect("/pratos");
    }
  });
});

router.post("/editar/:id", (req, res) => {
  const pratoId = req.params.id;
  const { nome, descricao, preco, imagem, ingredientes, categoria } = req.body;

  Pratos.update(
    {
      nome: nome,
      descricao: descricao,
      preco: preco,
      categoria: categoria,
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
      id: idPrato,
    },
  })
    .then(() => {
      res.redirect("/pratos");
    })
    .catch((err) => {
      console.error(err);
      res.redirect("/pratos");
    });
});

module.exports = router;
