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
        res.status(501).send({message: err.message});
    });
}

exports.getMessageSubscribe = (req,res,next) => {
    Subscribe.findAll()
    .then(user => {
        res.status(200).send({
            status: "OK",
            data: user
        })
    })
    .catch(err => {
        res.status(500).send({message: err.message});
    })
}

exports.deleteRequest = (req,res,next) => {
    try {
        Subscribe.destroy({
            where: {
                id: req.body.id
            }
        }).then(() => {
            res.status(200).send({
                message: "OK"
            })
        })
    } catch (error) {
        res.status(500).send({message: error.message});
    }
}

exports.getCountAllMessage = (req,res,next) => {
    // Model.findAll({
    //     attributes: [
    //       'foo',
    //       [sequelize.fn('COUNT', sequelize.col('hats')), 'n_hats'],
    //       'bar'
    //     ]
    //   });
    try {
        Subscribe.findAll({
            attributes:[[db.sequelize.fn("COUNT",db.sequelize.col('id')),'n_id']],
            raw: true
        }).then(subs => {
            res.status(200).send({
                data: subs
            })
        })
    } catch (error) {
        res.status(500).send({message: error.message});
    }
}