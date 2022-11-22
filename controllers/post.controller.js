const { post } = require("../models");
const db = require("../models");
const {
  post: Post,
  categoria: Categories,
  postCategories: postCategories,
  sequelize: sequelize,
  Sequelize: Sequelize,
} = db;

exports.posts = (req, res) => {
  Post.findAll({
    attributes: [
      "id",
      "titulo",
      "fecha",
      "anio",
      "descripcion",
      "breveDescripcion",
    ],
    group: "anio",
  }).then((post) => {
    res.send({
      data: post,
    });
  });
};
/*
exports.getPostsGroupAnio = async (req,res) => {
  await sequelize.query("select * from blog_sequelize.posts where anio = (select distinct anio from blog_sequelize.posts)").
  then(posts => {
    res.send({
      data: posts
    })
  })
}*/

//Funca pero no como quiero que devuelva los datos
/*exports.getPostsGroupAnio = async (req,res) => {
  Post.findAll({
    where: {
      anio : {
          [Sequelize.Op.in] : sequelize.literal("(select distinct p.anio from posts as p)")
      }
    }
  }).then(posts => {
  res.send({
    data: posts
  })
  })
}*/

exports.getPostsGroupAnio = async (req, res) => {
  await Post.findAll({
    attributes: [[Sequelize.fn("DISTINCT", Sequelize.col("anio")), "anio"]],
  }).then(async (posts) => {
    const datos = [];
    for (let anio in posts) {
      const objetos = {};
      objetos.anio = posts[anio].anio;
      objetos.data = new Array();
      await Post.findAll({
        where: {
          anio: posts[anio].anio,
        },
        raw: true,
      }).then(async (result) => {
        await objetos.data.push(...result);
      });
      datos.push(objetos);
    }
    res.send({
      data: datos,
    });
  });
};

exports.create_post = (req, res) => {
  Post.create({
    titulo: req.body.titulo,
    fecha: req.body.fecha,
    anio: req.body.anio,
    descripcion: req.body.descripcion,
    breveDescripcion: req.body.breveDescripcion,
  })
    .then((post) => {
      if (req.body.categories) {
        for (let i = 0; i < req.body.categories.length; i++) {
          Categories.findOne({
            where: {
              nombre: req.body.categories[i],
            },
          }).then((post_id) => {
            post
              .setCategories(post_id)
              .then(() => {
                // res.send({message: "Se ha creado el post con la siguiente categoria: "});
              })
              .catch((err) => {
                res.send({
                  message: `Ocurrió un error al insertar en post: ${err.message}`,
                });
              });
          });
        }
        res.send({
          message: "Se ha creado el post con la siguiente categoria: ",
        });
      } else {
        res.send({
          message: "Creado correctamente el post",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

exports.getByCategory = (req, res) => {
  // Post.findAll({
  //   // where: {
  //   //     id: req.body.categories
  //   // },
  //   include: [
  //     {
  //       model: Categories,
  //       as: "groups",

  //         where: {
  //           id: req.body.categories,
  //         },
  //         required: false,

  //     },
  //   ],
  // }).then((posts) => {
  //   res.send({
  //     data: posts,
  //   });
  // });

  Categories.findAll({
    where: {
      id: req.body.categories,
    },
    attributes: ["id"],
    include: [
      {
        model: Post,
        as: "articles",
        attributes: [
          "id",
          "titulo",
          "fecha",
          "anio",
          "descripcion",
          "breveDescripcion",
        ],
        require: false,
      },
    ],
  }).then((posts) => {
    res.send({
      data: posts,
    });
  });
};

exports.getByAnio = (req, res) => {
  Post.findAll({
    where: {
      anio: req.body.anio,
    },
  }).then((posts) => {
    res.send({
      data: posts,
    });
  });
};


//Obtener los datos de un post por id y se muestra en la vista de Articulos
exports.getById = (req,res) => {
  console.log("req: ", req);
  console.log("req: ", req.headers.id);
  Post.findOne({
    attributes: ["id","anio","descripcion","breveDescripcion","fecha","titulo","contenido"],
    where:{
      id: req.headers.id
    }
  }).then(posts => {
    res.send({
      data: posts
    })
  })
}


//Obtener el post mas reciente
exports.getLastPost = (req,res) => {
  Post.findAll({
    order: [
      ["fecha","DESC"]
    ],
    limit: Number.parseInt(req.headers.limit),
    raw: true
  }).then(post => {
    res.send({
      data: post
    })
  })
}