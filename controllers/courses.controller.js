const db = require("../models");
const Course = db.course;
const UserCourse = db.userCourses;
const sequelize= db.Sequelize;
const Op = db.Sequelize.Op;

//crear cursos
exports.createCourses = (req,res,next) => {
    
    if(req.file)
        req.body["imagen_portada"] = req.file.filename;
    else
        req.body["imagen_portada"] = null

    delete req.body.id;

    // console.log("BODY: ",req.body);
    try {
        Course.create(req.body)
        .then((course) => {
            res.status(200).send({
                status: "OK",
                data: course
            });
        })
    } catch (error) {
         res.status(500).send({message: error.message});
    }
};

//Borrar curso
exports.deleteCourses = (req,res,next) => {
    Course.destroy({
        where: {
            id: req.body.id
        }
    }).then(() => {
        res.status(200).send({
            status: "OK"
        })
    })
    .catch(error => res.status(500).send({message: error.message}))
} 

//Modificar curso
exports.modifyCourses = (req,res,next) => {
    //Se elimina el campo 'imagen_portada' ya que no pasa a modificacion en el formulario
    delete req.body["imagen_portada"];

    Course.update(req.body,{
        where: {
            id: req.body.id
        }
    }).then((course) => {
        res.status(200).send({
            status: "OK",   
            data: course
        })
    })
}

//Obtener todos los cursos con fecha de inicio vigente
exports.getCoursesAll = (req,res,next) => {
    Course.findAll({
        where: {
            fecha_limite_subscripcion: {
                [Op.gte] : new Date().toISOString().slice(0,10)
            }
        },
        raw:true
    }).then((course) => {
        console.log("Cursos: ",course)
        res.status(200).send({
            status: "OK",   
            data: course
        })
    })
    .catch(error => {
        res.status(500).send({message: error.message});
    })
}

/*
const budgetItems = await Item.findAll({
  attributes: ["id", "amount", "category"],
  where: {
    budgetId: {
      [Op.in]: sequelize.literal(
        `(SELECT b.id FROM budgets b
          WHERE b.startDate >= '2022-02-01'
            AND b.endDate <= '2022-02-07'
         )`
      ),
    },
  },
});

*/

//SELECT * FROM cursos_extension.courses where id not in (select courseId from cursos_extension.user_courses where userId = 2);
exports.getCoursesByUserInHome = (req,res,next) => {
    
    Course.findAll({
        where: {
            [Op.not]: [
                {
                    id: {
                         [Op.in] : sequelize.literal(`(select courseId from user_courses where userId = ${req.headers.id})`)
                    }   
                }
            ]
            
        },
        raw: true
    }).then(data => {
        
        res.status(200).send({
            status: "OK",
            data: data
        })
    })
    .catch(error => {
        res.status(500).send({message: error.message});
    })
}

exports.getCourseByUser = (req,res,next) => {
    Course.findAll({
        where: {
            id : {
                [Op.in] : sequelize.literal(`(select courseId from user_courses where userId = ${req.headers.id})`)
            }
        },
        include: [{
            attributes: ["queue"],
            model: UserCourse,
            where: {
                userId: req.headers.id
            } 
        }],
        raw: true
    }).then(data => {
        res.status(200).send({
            status: "OK",
            data: data
        })
    })
    .catch(error => {
        res.status(500).send({message: error.message})
    })
}

//Obtener un curso por id
exports.getCoursesById = (req,res,next) => {

    Course.findOne({
        where: {
            id: req.headers.id
        },  
        raw:true
    }).then((course) => {
        res.status(200).send({
            status: "OK",   
            data: course
        })
    })
    .catch(error => {
        res.status(500).send({message: error.message});
    })
}
