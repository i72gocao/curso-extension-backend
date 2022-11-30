const controller = require("../controllers/userCourses.controller");

module.exports = function (app){
    app.use(function(req,res,next){
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    // app.post("/api/users/courses/add",controller.addCourseToUser);
    // app.post("/api/users/courses/add",controller.addUserCourse);
    app.post("/api/users/courses/add",controller.addCoursesAndUsers);

    app.get("/api/users/courses/count",controller.getTotalUsersInCourses);
}