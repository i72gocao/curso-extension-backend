const {sequelize,Sequelize} = require(".")

module.exports = (sequelize,Sequelize) => {
    const UserCourses = sequelize.define("user_courses",{
        queue: {
            type: Sequelize.INTEGER,
            defaultValue: 0
        }
    },{
        timestamps: true
    });
    return UserCourses;
}