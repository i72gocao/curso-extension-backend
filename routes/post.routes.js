const controller = require("../controllers/post.controller");

module.exports = function(app){
    app.use(function(req,res,next){
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.get(
        "/api/post/all",
        controller.posts
    );

    app.post("/api/post/create-post",controller.create_post);

    app.get("/api/post/all/categories",controller.getByCategory);

    //app.get("/api/post/all/anio",controller.getByAnio);
    app.get("/api/post/all/anio",controller.getPostsGroupAnio);

    app.get("/api/post/test/all/anio",controller.getPostsGroupAnio);

    app.get("/api/post/id",controller.getById);

    app.get("/api/post/list/show", controller.getLastPost);
}