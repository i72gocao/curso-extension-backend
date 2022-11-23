const db = require("../models");
const UserCourses = db.userCourses;
const User = db.user;
const Course = db.curso;

exports.addCourseToUser = (req,res,next) => {
    UserCourses.create({
        user_id:req.body.user_id,
        course_id: req.body.course_id
    }).then(inscripcion => {
        res.status(200).send({
            status: "OK",
            data: inscripcion
        })
    }).catch(err => {
        res.status(500).send({message: err.message});
    })
};