const db = require("../models");
const Message = db.message;
const User = db.user;
const sequelize = db.sequelize;

const Op = db.Sequelize.Op;

exports.getMessageByUser = (req,res) => {
    
    try {
        User.findAll({
            attributes: ["id","username","email"],
            where: {
                id: req.headers.userid,
            },
            include: [{ 
                model: Message, 
                as: 'Messages' ,
                where: {
                    ready: 0
                }
                }
            ]
        })
        .then(message => {
            
            res.status(200).send({
                status: "OK",
                data: message
            })
        })
    } catch (error) {
        res.status(500).send({
            message: error.message
        })
    }
}

exports.createMessage = (req,res) => {
    try {
        Message.create({
            title: req.body.title,
            message: req.body.message,
            userId: req.body.userId
        })
        .then(data => {
            res.status(200).send({
                status: "OK",
                data: data
            })
        })
    } catch (error) {
        res.status(500).send({
            message: error.message
        })
    }
}

exports.updateMessage = (req,res) => {
    
    try {
        Message.update({ready: 1},{
            where: {
                id: req.body.messageId
            }
        })
        .then(data => {
            res.status(200).send({
                status: "OK",
                data: data
            })
        })
    } catch (error) {
        res.status(500).send({
            message: error.message
        })
    }
}

exports.testMessage = async (req,res) => {
    
    try {
        const user = await User.findAll({
            where: {
                id: req.headers.userid
            },
            include: { 
                model: Message, 
                as: 'Messages' ,
            }
        })
        
        console.log(JSON.stringify(user,null,2));
        
        // .then(data => {
        //     console.log("DATOS MESSAGE: ",data)
        // })
    } catch (error) {
        
    }
}