const db = require("../models");

const Curso = db.curso;

//crear cursos
exports.createCourses = (req,res,next) => {
    Curso.create({
        
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

}

//Obtener un curso por id
exports.getCoursesById = (req,res,next) => {

}