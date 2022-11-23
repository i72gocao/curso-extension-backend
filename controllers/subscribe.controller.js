const {subscribe} = require("../models");
const db = require("../models");
const Subscribe = db.subscribe;

exports.subscribe = (req,res,next) => {
    Subscribe.create({
        fullname: req.body.fullname,
        username: req.body.username,
        email: req.body.email 
    }).then(user => {
        res.status(200).send({
            status: "OK!",
            data: user
        })
    }).catch(err => {
        res.status(500).send({message: err.message});
    });
}