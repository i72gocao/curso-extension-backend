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

db.refreshToken = require("../models/refreshToken.model")(sequelize,Sequelize);
db.subscribe = require("../models/subscribe.model")(sequelize,Sequelize);

db.curso = require("../models/cursos.model")(sequelize,Sequelize);

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

db.refreshToken.belongsTo(db.user, {
    foreignKey: 'userId',
    targetKey: 'id'
});

db.user.hasOne(db.refreshToken,{
    foreignKey: 'userId',
    targetKey: 'id'
});

db.ROLES = ["user","admin","moderador"];

module.exports = db;