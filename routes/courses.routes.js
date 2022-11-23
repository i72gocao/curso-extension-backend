const controller = require("../controllers/courses.controller");

module.exports = function(app){
    app.use(function(req,res,next){
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.post("/api/courses/create-course",controller.createCourses);

    app.post("/api/courses/delete-course",controller.deleteCourses);
    
    app.post("/api/courses/modify-course",controller.modifyCourses);
    
    app.post("/api/courses/get-courses",controller.getCoursesAll);
    
    app.post("/api/courses/get-course",controller.getCoursesById);
}