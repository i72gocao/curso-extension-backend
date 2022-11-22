const db = require("../models");

const Curso = db.curso;

exports.createCourses = (req,res,next) => {
    Curso.create({
        
    })
}