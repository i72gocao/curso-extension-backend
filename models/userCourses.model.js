const {sequelize,Sequelize} = require(".")

module.exports = (sequelize,Sequelize) => {
    const UserCourses = sequelize.define("user_courses",{
        
    },{
        timestamps: false
    });
    return UserCourses;
}