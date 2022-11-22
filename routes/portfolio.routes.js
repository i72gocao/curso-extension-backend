const controller = require("../controllers/portfolio.controller");

module.exports = function(app){
    app.use(function(req,res,next){
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.get("/api/portfolio/all",controller.portfolios);

    app.put("/api/portfolio/update/visitas", controller.updateVisits);
}