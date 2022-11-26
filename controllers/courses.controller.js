const db = require("../models");

const Course = db.course;

//crear cursos
exports.createCourses = (req,res,next) => {
    Course.create({
        
    })
};

//Borrar curso
exports.deleteCourses = (req,res,next) => {

}

//Modificar curso
exports.modifyCourses = (req,res,next) => {

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
}

//Obtener un curso por id
exports.getCoursesById = (req,res,next) => {

}