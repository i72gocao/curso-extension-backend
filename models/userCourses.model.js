const {sequelize,Sequelize} = require(".")

module.exports = (sequelize,Sequelize) => {
    const UserCourses = sequelize.define("user_courses",{
        id: {
            type:Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        }
    },{
        timestamps: false
    });
    return UserCourses;
}