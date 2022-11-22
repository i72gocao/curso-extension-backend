const createError = require("http-errors");
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");

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
const Portfolio = db.portfolio;
const Categories = db.categoria;
const Posts = db.post;

db.sequelize.sync({ force: true }).then(() => {
  initial();
  initialPortfolioData();
  initialCategories();
  initialTestPost();
});

function initial() {
  Role.create({
    id: 1,
    name: "user",
  });

  Role.create({
    id: 2,
    name: "moderador",
  });

  Role.create({
    id: 3,
    name: "admin",
  });
}

function initialPortfolioData() {
  Portfolio.create({
    id: 1,
    fecha_creacion: "2021-12-24T06:00",
    titulo: "Goovie",
    descripcion: "Buscador de series con ReactJS",
    url_demo: "https://lefrancais2.github.io/goovie/",
    url_source: "https://github.com/lefrancais2/buscadorSeries",
    visitas: 0,
  });

  Portfolio.create({
    id: 2,
    fecha_creacion: "2022-01-27T06:00",
    titulo: "Weather App",
    descripcion: "Challenge Weather App with ReactJs",
    url_demo: "https://lefrancais2.github.io/weather-app/",
    url_source: "https://github.com/lefrancais2/weather-app-challenge",
    visitas: 0,
  });

  Portfolio.create({
    id: 3,
    fecha_creacion: "2022-02-01T06:00",
    titulo: "OsGod Engineer Github",
    descripcion: "Página Web profesional con Vanilla JS",
    url_demo: "https://lefrancais2.github.io/portafolio-cv/",
    url_source: "https://github.com/lefrancais2/portafolio-cv",
    visitas: 0,
  });

  Portfolio.create({
    id: 4,
    fecha_creacion: "2021-09-11T06:00",
    titulo: "El Olivar Restaurante",
    descripcion: "Desarrollo de página web con Laravel",
    url_source: "https://github.com/lefrancais2/ElOlivar-Laravel",
    visitas: 0,
  });

  Portfolio.create({
    id: 5,
    fecha_creacion: "2022-01-27T06:00",
    titulo: "Quiz Game with ReactJS",
    descripcion: "Juego de preguntas sobre capitales y paises",
    url_source: "https://github.com/lefrancais2/quiz-react",
    url_demo: "https://lefrancais2.github.io/quiz-game",
    visitas: 0,
  });
}

function initialCategories(){
    Categories.create({
        id: 1,
        nombre: "sql"
    });
    Categories.create({
        id: 2,
        nombre: "JavaScript/TypeScript"
    });
    Categories.create({
        id: 3,
        nombre: "C/C++"
    });
    Categories.create({
        id: 4,
        nombre: "Python"
    });
    Categories.create({
        id: 5,
        nombre: "ReactJs"
    });
    Categories.create({
        id: 6,
        nombre: "Data Science"
    });
    Categories.create({
        id: 7,
        nombre: "Machine Learning"
    });
    Categories.create({
        id: 8,
        nombre: "Trucos Programación"
    })
}

async function initialTestPost(){
    await Posts.bulkCreate([{
        id: 1,
        titulo:"Primer post de prueba",
        fecha:"2022-10-21T06:00:00",
        anio:"2022",
        descripcion:"Primer post creado como prueba para poder crear paginas de posts",
        breveDescripcion:"Evoluciones",
        contenido: `<main class="texto texto-dark">
        <div>
          <h2>Este es el primer post a tener en cuenta</h2>
        </div>
        <section>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero repudiandae cum repellendus dolorem ullam sapiente possimus aperiam cumque nam, nihil iure, modi natus expedita reprehenderit dicta reiciendis exercitationem laboriosam rem.</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos quod impedit minima expedita. Ad ex eligendi omnis incidunt quo ut amet accusantium tempore, illo sint laudantium qui laborum inventore molestiae.</p>
          <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Magni maxime tempore inventore laboriosam veritatis quas atque temporibus est facilis beatae voluptatem culpa dolorem facere adipisci a voluptatibus, fuga cupiditate? Accusamus.</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis doloribus velit officiis deserunt mollitia possimus ullam, ut maxime, quia omnis ratione ea quisquam autem cupiditate iusto sapiente quaerat? Sapiente, quas?</p>
          
          <pre>
            <code class="language-javascript">
              class Persona{
                private int number;
            
                public Persona(int number){
                  //Esto es el constructor
                  this.number = number;
                }
              }
      
              const saludo = () => {
                console.log("Hola Mundo");
                return;
              }
            </code>
          </pre>
          
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae nesciunt cumque ex veniam odit, molestiae dolorem nemo quas placeat! Similique hic unde cumque harum voluptatem at labore cupiditate atque dolor?</p>
          <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Deleniti error eum nulla aspernatur tempore beatae quo quibusdam! Cupiditate adipisci doloribus, quam aspernatur suscipit sunt quae modi quibusdam, fuga illum quasi?</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet perspiciatis, sapiente quod autem voluptates eos dicta hic, unde illo, vero similique architecto quasi dolores tempore minus nulla. Amet, dolores repellendus?</p>
      
          <h3>Diferencias entre java y javascript</h3>
      <pre>
          <code class="language-javascript">
            //Una de las diferencias es la declaración del constructor
      
            //Constructor en java
            class Language{
              private String language;
              public Language(String language){
                this.language = language;
              }
            }
            
            //Constructor en javascript
            class Language{
              const language;
              constructor(let language){
                this.language = language;
              }
            }
      
            const a = () => {
              console.log("Adios");
            }
          </code>
      </pre>
        </section>
      </main>`
    },
    {
      id: 2,
      titulo:"Evolve Lucky 2",
      fecha:"2022-10-23T06:00:00",
      anio:"2022",
      descripcion:"Evolucion de pokemons con huevo de la suerte",
      breveDescripcion:"Evoluciones"
  },
    {
        id: 3,
        titulo:"Evolve Lucky 3",
        fecha:"2022-10-22T06:00:00",
        anio:"2022",
        descripcion:"Evolucion de pokemons con huevo de la suerte",
        breveDescripcion:"Evoluciones"
    },
    {
        id: 4,
        titulo:"Evolve Lucky 4",
        fecha:"2022-10-25T06:00:00",
        anio:"2022",
        descripcion:"Evolucion de pokemons con huevo de la suerte",
        breveDescripcion:"Evoluciones"
    },{
        id: 5,
        titulo:"Evolve Lucky 5",
        fecha:"2022-10-22T06:00:00",
        anio:"2022",
        descripcion:"Evolucion de pokemons con huevo de la suerte",
        breveDescripcion:"Evoluciones"
    },{
        id: 6,
        titulo:"Evolve Lucky 6",
        fecha:"2022-10-26T06:00:00",
        anio:"2022",
        descripcion:"Evolucion de pokemons con huevo de la suerte",
        breveDescripcion:"Evoluciones"
    },{
        id: 7,
        titulo:"Evolve Lucky 7",
        fecha:"2022-10-29T06:00:00",
        anio:"2022",
        descripcion:"Evolucion de pokemons con huevo de la suerte",
        breveDescripcion:"Evoluciones"
    },{
        id: 8,
        titulo:"Evolve Lucky 8",
        fecha:"2022-10-24T06:00:00",
        anio:"2022",
        descripcion:"Evolucion de pokemons con huevo de la suerte",
        breveDescripcion:"Evoluciones"
    },{
        id: 9,
        titulo:"Evolve Lucky 9",
        fecha:"2022-10-25T06:00:00",
        anio:"2022",
        descripcion:"Evolucion de pokemons con huevo de la suerte",
        breveDescripcion:"Evoluciones"
    },{
      id: 10,
      titulo:"Evolve Lucky 10",
      fecha:"2021-10-25T06:00:00",
      anio:"2021",
      descripcion:"Evolucion de pokemons con huevo de la suerte",
      breveDescripcion:"Evoluciones"
  },{
    id: 11,
    titulo:"Evolve Lucky 11",
    fecha:"2021-10-29T06:00:00",
    anio:"2021",
    descripcion:"Evolucion de pokemons con huevo de la suerte",
    breveDescripcion:"Evoluciones"
},{
  id: 12,
  titulo: "Cómo realizar el enrutamiento con <code>reactjs</code> y <code>react router v6</code>",
  fecha: "2022-10-31T06:00:00",
  anio: "2022",
  descripcion: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis earum sunt laudantium perferendis fuga minus fugit dolores mollitia a quam, quo vel sit perspiciatis reprehenderit possimus eius eaque enim odit.",
  breveDescripcion: "Lorem ipsum dolor sit amet consectetur"  
}
]);
}


app.get("/", (req, res) => {
  res.json({ message: "Bienvenido majestad" });
});

require("./routes/auth.routes")(app);
require("./routes/user.routes")(app);
require("./routes/post.routes")(app);
require("./routes/portfolio.routes")(app);
require("./routes/subscribe.routes")(app);

// catch 404 and forward to error handler
// app.use(function (req, res, next) {
//   next(createError(404));
// });

// // error handler
// app.use(function (err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get("env") === "development" ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render("error");
// });

module.exports = app;
