const db = require("../models");
const Course = db.course;

//crear cursos
exports.createCourses = (req,res,next) => {
    if(req.file)
        req.body["imagen_portada"] = req.file.filename;

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
