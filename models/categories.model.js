module.exports = (sequelize,Sequelize) => {
    const Categories = sequelize.define("categories", {
        nombre: {
            type: Sequelize.STRING,
            allowNull: false
        }
    })
    return Categories;
}