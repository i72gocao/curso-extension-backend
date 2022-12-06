const db = require("../models");
const UserCourses = db.userCourses;
const User = db.user;
const Course = db.course;
const Message = db.message;

const sequelize = db.sequelize;
const Op = db.Sequelize.Op;

function createMessage({title,message,userId}){
  Message.create({
    title,
    message,
    userId
  })
}

exports.addCoursesAndUsers = async (req,res,next) => {
    try {
      UserCourses.findAndCountAll({
        where: {
          courseId: req.body.courseId
        },
        raw: true
      }).then(async result => {
        //res.count //devuelve el numero de tuplas contadas
        Course.findOne({
          where: {
            id: req.body.courseId
          },
          raw: true
        })
        .then(async res2 => {

          let inQueue = result.count >= res2.max_participantes ? 1 : 0
          const message = {
            title: `Mensaje de curso ${res2.titulo}`,
            userId: req.body.userId
          }
          
          if(inQueue === 1){//va a cola
            message["message"] = `No se ha podido inscribir en el curso '${res2.titulo}' al no haber plazas disponibles por lo tanto se asigna en lista de espera.`;
          }else{//inscripcion en curso
            message["message"] = `Se ha podido inscribir en el curso '${res2.titulo}' con éxito.`;
          }
          
          createMessage(message);

          UserCourses.create({
              userId: req.body.userId,
              courseId: req.body.courseId,
              queue: inQueue
          }).then((course) => {
              res.status(200).send({
                  status: "OK",
                  data: course
              })
          })

        })
      })
    } catch (error) {
        throw new error("Ha ocurrido un error.");
    }
}

exports.addCourseToUser = (req, res, next) => {
  
    UserCourses.findAll({
        attributes: [sequelize.fn("MAX", sequelize.col("id"))],
        raw: true,
    }).then((data) => {
        // console.log("DATAaaAAA: ", data[0]['MAX(`id`)'])
        let maxId = data[0]["MAX(`id`)"];

        UserCourses.create({
            id: parseInt(maxId) + 1,
            userId: parseInt(req.body.user_id),
            cursoId: parseInt(req.body.course_id),
        })
        .then((inscripcion) => {
            res.status(200).send({
                status: "OK",
                data: inscripcion,
            });
        }).catch((err) => {
            res.status(500).send({ message: err.message });
        });
    });
};

exports.addUserCourse = (req, res, next) => {
  Course.findByPk(req.body.course_id).then((course) => {
    if (!course) {
      console.log("No se encuentra el curso");
      return;
    }
    User.findByPk(req.body.user_id).then((user) => {
      if (!user) {
        console.log("No se encuentra usuario");
        return;
      }

      Course.create(user).then((res) => {
        res.status(200).send({
          status: "OK",
          data: res,
        });
      });
    });
  });
};

exports.getTotalUsersInCourses = (req,res,next) => {
  
  UserCourses.findAndCountAll({
      where: {
        courseId: req.headers.id
      },
      raw: true
  }).then(data => {
    res.status(200).send({
      status: "OK",
      data: data.count
    })
  })
  .catch(error => {
    res.status(500).send({message: error.message});
  })
}

exports.modifyInscription = async (req,res,next) => {
  //Se obtiene la información previamente del usuario en la tabla user_courses
  //para luego proceder entre una de las dos opciones a realizar
  const userData = await UserCourses.findOne({
    where: {
      userId: req.body.userId,
      courseId: req.body.courseId
    },
    raw: true
  })

  
  const userDelete = UserCourses.destroy({
    where: {
      userId: req.body.userId,
      courseId: req.body.courseId
    }
  })

  if(userData.queue === 1){
    //si se borra un usuario que estaba en cola, se elimina y se emite mensaje
    userDelete.then(result => {
      console.log("Resultado: ",result)
      res.status(200).send({
        status: "OK",
        data: null
      })
    })
  }else{
    //En caso de que el usuario al darse de baja y no estaba en cola previamente, se reasigna la posicion al siguiente mas antiguo en cola
    userDelete.then(async result => {
      /*      
      // UserCourses.update({
      //   queue: 0
      // },{
      //   where : {
      //     courseId : req.body.courseId,
      //     useId: {
      //       [Op.eq] : sequelize.literal(`select userId from user_courses where courseId = ${req.body.courseId} and queue = 1 order by createdAt asc limit 1`)
      //     }
      //   }
      // })
      // .then(data => {
      //   console.log("DATOS: ", data);
      // })
      */
     //Busca el siguiente usuario que este en cola con el tiempo de espera mas alto.
      UserCourses.findOne({
        where:{
          courseId: req.body.courseId,
          queue: 1
        },
        order: [
          ["createdAt","asc"]
        ],
        raw: true
      }).then(user => {
        if(user){
          //Course.findOne({where: {id: req.body.courseId}})
          
          UserCourses.update({queue: 0},
            {
              where: {
                courseId: req.body.courseId,
                userId: user.userId
              }
            })
            .then(data => {
              //Crea el mensaje para el nuevo inscrito despues de salir de cola
              Message.create({
                title: "Inscripción en curso",
                message: `Con motivo que hay vacante disponible, se ha podido inscribir en el curso de extensión de ${req.body.titulo}`,
                userId: user.userId
              });

              res.status(200).send({
                status: "OK1",
                data: user.userId
              })
            })
        }else{
          res.status(200).send({
            status: "OK2",
            data: user
          })
        }

      })
    })
    .catch(error => {
      res.status(500).send({
        message: error.message
      })
    })
  }
}
