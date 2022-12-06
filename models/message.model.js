module.exports = (sequelize,Sequelize) => {
    const Message = sequelize.define("messages",{
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        title: {
            type:Sequelize.STRING,
            allowNull: false
        },
        message: {
            type:Sequelize.TEXT,
            allowNull: false
        },
        ready: {
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 0
        }
    })
    return Message;
}