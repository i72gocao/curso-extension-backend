const createError = require("http-errors");
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");

var bcrypt = require("bcryptjs");

const app = express();

var corsOption = {
  origin: "http://localhost:3000",
};

app.use(cors(corsOption));

app.set("views", path.join(__dirname, "/"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));

const db = require("./models");
const Role = db.role;
const User = db.user;
const Course = db.curso;

db.sequelize.sync({ force: true }).then(() => {
  initial();
  userAdmin();
  coursesData();
});

function initial() {
  Role.create({
    id: 1,
    name: "admin",
  });
  Role.create({
    id: 2,
    name: "user",
  });
  Role.create({
    id: 3,
    name: "coordinador_recuros",
  });
  Role.create({
    id: 4,
    name: "coordinador_cursos",
  });
}
//bcrypt.hashSync(req.body.password,8)
function userAdmin(){
  User.create({
    id: 1,
    fullname: "admin admin",
    username: "admin",
    password: bcrypt.hashSync("12345678"),
    email: "admin@example.com"
  });

  User.create({
    id: 2,
    fullname: "example example",
    username: "lefrancais",
    password: bcrypt.hashSync("12345678"),
    email: "user@uco.es"
  });
}

function coursesData(){
  Course.create({
    id: 1,
    titulo: "Programacion web",
    descripcion: "Programacion web para beginners",
    precio: 150.50,
    fecha_inicio: "2022-12-25",
    fecha_fin: "2023-03-30",
    fecha_limite_subscripcion: "2022-12-15",
    min_participantes: 3,
    max_participantes: 10
  })
}

app.get("/", (req, res) => {
  res.json({ message: "Bienvenido" });
});

require("./routes/auth.routes")(app);
require("./routes/user.routes")(app);
require("./routes/subscribe.routes")(app);

module.exports = app;
