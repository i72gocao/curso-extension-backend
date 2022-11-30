const db = require("../models");
const UserCourses = db.userCourses;
const User = db.user;
const Course = db.course;
const sequelize = db.sequelize;

exports.addCoursesAndUsers = async (req,res,next) => {
    try {
        UserCourses.create({
            userId: req.body.userId,
            courseId: req.body.courseId
        }).then((course) => {
            res.status(200).send({
                status: "OK",
                data: course
            })
        })
    } catch (error) {
        throw new error("Ha ocurrido un error.");
    }
}

exports.addCourseToUser = (req, res, next) => {
  console.log("request: ", req);

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
