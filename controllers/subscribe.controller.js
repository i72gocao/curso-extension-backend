const {subscribe} = require("../models");
const db = require("../models");
const Subscribe = db.subscribe;

exports.subscribe = (req,res,next) => {
    Subscribe.create({
        email: req.body.email,
    }).then(email => {
        res.status(200).send({
            status: "OK!"
        })
    }).catch(err => {
        res.status(500).send({message: err.message});
    });
}