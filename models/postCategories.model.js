const { sequelize, Sequelize } = require(".");

module.exports = (sequelize,Sequelize) => {
    const PostCategories = sequelize.define("post_categories",{
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
    },{
        timestamps: false
    });
    return PostCategories;
}