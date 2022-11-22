const jwt = require("jsonwebtoken");
const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;

const {TokenExpiredError} = jwt;

const catchError = (err,res) => {
    if(err instanceof TokenExpiredError){
        return res.status(401).send({message: "No autorizado! Token de acceso ha expirado"});
    }
    return res.status(401).send({message: "No autorizado"});
}

const verifyToken = (req,res,next) => {
    let token = req.headers["x-access-token"];

    if(!token){
        return res.status(403).send({
            message: "Sin token proporcionado"
        });
    }

    jwt.verify(token, config.secret, (err,decoded) => {
        if(err){
            return catchError(err,res);
        }
        req.userId = decoded.id;
        next();
    });
}

isAdmin = (req,res,next) => {
    User.findByPk(req.userId).then(user => {
        user.getRoles().then(roles => {
            // for (let i = 0; i < roles.length; i++) {
            //     if(roles[i].name === "admin"){
            //         next();
            //         return;
            //     }
                
            // }
            loopRoles(roles,"admin",next);

            res.status(403).send({
                message: "Es necesario tener el rol de admin"
            });
            return;
        });
    });
}

isModerador = (req,res,next) => {
    User.findByPk(req.userId).then(user => {
        user.getRoles().then(roles => {
            loopRoles(roles,"moderador",next);

            res.status(403).send({
                message: "Es necesario tener el rol de moderador"
            })
        })
    })
}

isModeradorOrAdmin = (req,res,next) => {
    User.findByPk(req.userId).then(user => {
        user.getRoles().then(roles => {
            for (let i = 0; i < roles.length; i++) {
                if(roles[i] === "admin"){
                    next();
                    return;
                }
                if(roles[i] === "moderador"){
                    next();
                    return;
                }
            }

            res.status(403).send({
                message: "Es necesario ser admin o moderador"
            });
        });
    });
}

const loopRoles = (roles,role,next) => {
    for (let i = 0; i < roles.length; i++) {
        if(roles[i] === role){
            next();
            return;
        }
    }
}

const authJwt = {
    verifyToken: verifyToken,
    isAdmin: isAdmin,
    isModerador: isModerador,
    isModeradorOrAdmin: isModeradorOrAdmin,
    catchError: catchError
};

module.exports = authJwt;