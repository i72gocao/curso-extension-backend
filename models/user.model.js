const { Sequelize } = require("sequelize");

module.exports = (sequelize,Sequelize) => {
    const User = sequelize.define("users", {
        fullname: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        },
        username: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        },
        password:{
            type: Sequelize.STRING,
            allowNull: false,
        },
        email:{
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        }
    });
    return User;
}