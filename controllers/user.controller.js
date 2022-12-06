const db = require("../models");
const User = db.user;
const Subscribe = db.subscribe;

var bcrypt = require("bcryptjs");

exports.allAccess = (req,res) => {
    res.status(200).send("Public content.")
}

exports.userBoard = (req,res) => {
    res.status(200).send("User Content")
}

exports.adminBoard = (req,res) => {
    res.status(200).send("Admin Content.");
}

exports.acceptUser = async (req,res) => {
    try {
        Subscribe.findOne({
            where: {
                id: req.body.id
            },
            attributes: ["fullname","username","email"],
            raw: true
        }).then(subs => {
            
            subs["password"] = bcrypt.hashSync("user123456");
            User.create(subs)
            .then(user => {
                res.status(200).send({
                    status: "OK",
                    data: user
                });
            })
        });
        
    } catch (error) {
        res.status(500).send({message: error.message});
    }
}