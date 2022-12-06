const multer  = require('multer')
var path = require('path')
/*
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '/tmp/my-uploads')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix)
    }
  })
  
const upload = multer({ storage: storage })
*/

//Version extendida con control sobre el fichero subido
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/public/images/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() +'-'+ Math.round(Math.random() * 1E9)+ path.extname(file.originalname)) //Appending extension
  }
})

const upload = multer({ storage: storage });

  
// const upload = multer({ dest: 'uploads/' }) //ejemplo original
//const upload = multer({ dest: 'uploads/public/images/' })//se cambia el path
const controller = require("../controllers/courses.controller");

module.exports = function(app){
    app.use(function(req,res,next){
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.post("/api/courses/create-course",upload.single('file'),controller.createCourses);

    app.delete("/api/courses/delete-course",controller.deleteCourses);
    
    app.put("/api/courses/modify-course",controller.modifyCourses);
    
    app.get("/api/courses/get-all-courses",controller.getCoursesAll);
    
    app.get("/api/courses/get-course/id",controller.getCoursesById);

    app.get("/api/courses/user/show-home",controller.getCoursesByUserInHome);
    
    app.get("/api/courses/user/list",controller.getCourseByUser);
    // app.post("/api/admin/load/files",upload.single('file'),controller.uploadFiles);
}