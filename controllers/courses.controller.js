const db = require("../models");


const Course = db.course;

//crear cursos
exports.createCourses = (req,res,next) => {
    
    //Buscar si req.file.filename existe para poder guardarlo
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

exports.uploadFiles = async (req,res,next) => {
    console.log("IMAGEN: ",req.file);
    console.log("BODY: ",req.body);
    console.log("Filename: ",req.file.filename);
    req.body["imagen_portada"] = req.file.filename;
    console.log("BODY: ",req.body);

    // Course.create
    // try {
    //     if (!req.files) {
    //       res.send({
    //         status: false,
    //         message: 'No file uploaded'
    //       })
    //     } else {
    //       // Use the name of the input field (i.e. "avatar") to retrieve the uploaded file
    //       let file = req.files.file
    //         console.log("LLEGAS AQUI: ",req.files);
    //       // Use the mv() method to place the file in the upload directory (i.e. "uploads")
    //       //file.mv('./uploads/' + avatar.name)
    
    //       //send response
    //       res.send({
    //         status: true,
    //         message: 'File is uploaded'
    //       })
    //     }
    //   } catch (err) {
    //     res.status(500).send(err)
    //   }
}