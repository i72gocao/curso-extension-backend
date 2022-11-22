const { portfolio } = require("../models");
const db = require("../models");
const Portfolio = db.portfolio;

exports.portfolios = (req,res,next) => {
    Portfolio.findAll({
        order: [
            ["fecha_creacion","DESC"]
        ]
    }).then(portfolio => {
        res.send({
            data: portfolio
        });
    })
};

exports.updateVisits = (req,res,next) => {
    console.log("resqqqq: ", req)
    Portfolio.update(
        {
            visitas: parseInt(req.body.visitas)+1,
        },
        {
            where: {id : req.body.id},
        }
    ).then(portfolio => {
        res.send({
            data: portfolio
        })
    });
}