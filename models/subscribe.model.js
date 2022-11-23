module.exports = (sequelize,Sequelize) => {
    const Subscribe = sequelize.define("subscribe",{
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        fullname: {
            type: Sequelize.STRING,
            allowNull: false
        },
        username: {
            type: Sequelize.STRING,
            allowNull: false
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false
        }
    });
    return Subscribe;
}