const controller = require("../controllers/subscribe.controller");

module.exports = function(app){
    app.use(function(req,res,next){
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    //Permitir a los usuarios enviar su solicitud de registro de usuario.
    app.post("/api/course/subscribe/user",controller.subscribe);

    //Obtener todas las solicitudes de registro de usuario.
    app.get("/api/admin/get/messages/user",controller.getMessageSubscribe);

    //Borrar los usuarios que son admitidos a registro.
    app.delete("/api/admin/delete/message/user",controller.deleteRequest);

    //Contar el numero de solicitud de registro en BD.
    app.get("/api/admin/message/count/all",controller.getCountAllMessage);
}