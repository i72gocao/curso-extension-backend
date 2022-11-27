const createError = require("http-errors");
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const multer = require('multer');

var bcrypt = require("bcryptjs");

const app = express();

var corsOption = {
  origin: "http://localhost:3000",
};

app.use(cors(corsOption));

app.set("views", path.join(__dirname, "/"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const directory = path.join(__dirname, '/uploads');
app.use('/uploads', express.static(directory));

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));

const db = require("./models");
const Role = db.role;
const User = db.user;
const Course = db.course;
const UserCourse = db.userCourses;
const Subscribe = db.subscribe;




db.sequelize.sync({ force: true }).then(() => {
  initial();
  userAdmin();
  coursesData();
  userCourses();
  createMessageSubscribe();
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

  User.create({
    id: 3,
    fullname: "fulano fulano",
    username: "osgod",
    password: bcrypt.hashSync("12345678"),
    email: "user123@uco.es"
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
  });
  Course.create({
    id: 2,
    titulo: "Seguridad Informatica",
    descripcion: "Seguridad Informatica para beginners",
    precio: 150.50,
    fecha_inicio: "2022-12-25",
    fecha_fin: "2023-03-30",
    fecha_limite_subscripcion: "2022-12-15",
    min_participantes: 3,
    max_participantes: 10
  });
  Course.create({
    id: 3,
    titulo: "Machine Learning",
    descripcion: "Machine Learning y data minning para beginners",
    precio: 150.50,
    fecha_inicio: "2022-12-25",
    fecha_fin: "2023-03-30",
    fecha_limite_subscripcion: "2022-12-15",
    min_participantes: 5,
    max_participantes: 20
  })
}

function userCourses(){
  UserCourse.create({
    userId:2,
    courseId: 1,
  });
}

function createMessageSubscribe(){
    Subscribe.create({fullname:"Clark Kent",username:"Superman",email:"superman@uco.es"});
    Subscribe.create({fullname:"Bruce Wayne",username:"Batman",email:"batman@uco.es"});
    Subscribe.create({fullname:"Anakin Skywalker",username:"Darth Vader",email:"anakin@uco.es"});
    Subscribe.create({fullname:"Goku Migato-no-gokui",username:"supersayajin",email:"supersayajin@uco.es"});
    Subscribe.create({fullname:"Tony Stark",username:"ironman",email:"ironman@uco.es"});
}

app.get("/", (req, res) => {
  res.json({ message: "Bienvenido" });
});

require("./routes/auth.routes")(app);
require("./routes/user.routes")(app);
require("./routes/courses.routes")(app);
require("./routes/subscribe.routes")(app);
require("./routes/userCourse.routes")(app);

module.exports = app;
