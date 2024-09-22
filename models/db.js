const Sequelize = require("sequelize");
const dotenv = require("dotenv");
dotenv.config();

const sequelize = new Sequelize(
  process.env.DATABASE,
  process.env.USER_MYSQL,
  process.env.PASSWORD_MYSQL,
  {
    host: "localhost",
    dialect: "mysql",
  }
);

const Pedidos = sequelize.define("pedidos", {
  nome: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  descricao: {
    type: Sequelize.TEXT,
  },
  preco: {
    type: Sequelize.DECIMAL(10, 2), //00000000,00
    allowNull: false,
  },
  status: {
    type: Sequelize.STRING,
    defaultValue: "pendente",
  },
});

module.exports = {
  Sequelize,
  sequelize,
  Pedidos
};
