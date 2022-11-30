const db = require("../models")
const Role = db.role;
const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

exports.getRoles = (req,res,next) => {
    Role.findAll({
        where: {
            [Op.not] : [
                {
                    id : {
                        [Op.like]: "1"
                    }
                }
            ]
        }
    })
    .then(data => res.status(200).send({
        status: "OK",
        data: data
    }))
    .catch(error => {
        res.status(500).send({message: error.message});
    })
}