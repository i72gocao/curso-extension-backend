const db = require("../models");
const config = require("../config/auth.config");
//const User = db.user;//llama al modelo User
//const Role = db.role;//llama al modelo Role
const {user: User,role: Role} = db;

const Op = db.Sequelize.Op;

var bcrypt = require("bcryptjs");

exports.signup = (req,res) => {
    User.create({
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password,8)
    }).then(user => {
        if(req.body.roles){
            Role.findAll({
                where: {
                    name: {
                        //Aqui si req.body.roles es un array de mas de un elemento entonces seria: where name = "admin" or name = "moderador"
                        [Op.or]: req.body.roles
                    }
                }
            }).then(roles => {
                user.setRoles(roles).then(() => {
                    res.send({message: "Usuario fue registrado satisfactoriamente aqui."});
                })
            })
        }else{
            user.setRoles([1]).then(() => {
                res.send({message: "Usuario fue registrado satisfactoriamente otro."});
            })
        }
    }).catch(err => {
        res.status(500).send({message: err.message})
    })
};

exports.signin = (req,res) => {
    // console.log("BODY: " + req.body.username);
    User.findOne({
        where: {
            email: req.body.email
        }
    }).then(async (user) => {
        if(!user) {
            return res.status(404).send({message: "Usuario no encontrado"});
        }

        const passwordIsValid = bcrypt.compareSync(req.body.password,user.password);

        if(!passwordIsValid){
            return res.status(401).send({
                message: "Contraseña no válida."
            })
        }

        return res.status(200).send({
            message: "Usuario encontrado",
            data: user
        })
         
    }).catch(err => {
        res.status(500).send({message: err.message});
    });
};