const { Sequelize } = require("sequelize");

module.exports = (sequelize,Sequelize) => {
    const User = sequelize.define("users", {
        username: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        },
        password:{
            type: Sequelize.STRING,
            allowNull: false,
        },
        avatar: {
            type: Sequelize.STRING
        },
        email:{
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        }
    });
    return User;
}