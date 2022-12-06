const config = require("../config/db.config");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
    config.DB,
    config.USER,
    config.PASSWORD,
    {
        host: config.HOST,
        dialect: config.dialect,
        operatorsAliases: false,
    }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("../models/user.model")(sequelize,Sequelize);
db.role = require("../models/role.model")(sequelize,Sequelize);

db.subscribe = require("../models/subscribe.model")(sequelize,Sequelize);

db.course = require("./courses.model")(sequelize,Sequelize);
db.userCourses = require("../models/userCourses.model")(sequelize,Sequelize);

db.message = require("../models/message.model")(sequelize,Sequelize);

db.role.belongsToMany(db.user, {
    through: "user_roles",
    foreignKey: "roleId",
    otherKey: "userId"
});

db.user.belongsToMany(db.role,{
    through: "user_roles",
    foreignKey: "userId",
    otherKey: "roleId"
});

db.course.belongsToMany(db.user,{
    as: "user_",
    through: db.userCourses,
    // foreignKey: "user_id",
    // otherKey: "course_id"
});
db.user.belongsToMany(db.course,{
    as: "curso_",
    through: db.userCourses,
    // foreignKey:"course_id",
    // otherKey: "user_id"
});

db.user.hasMany(db.message, { as: 'Messages' });
db.message.belongsTo(db.user);

db.user.hasMany(db.userCourses);
db.userCourses.belongsTo(db.user);
db.course.hasMany(db.userCourses);
db.userCourses.belongsTo(db.course);

db.ROLES = ["user","admin"];

module.exports = db;