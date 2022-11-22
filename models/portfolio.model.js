module.exports = (sequelize,Sequelize) => {
    const Portfolio = sequelize.define("portfolios",{
        id:{
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        fecha_creacion: {
            type: Sequelize.DATE
        },
        titulo:{
            type: Sequelize.STRING,
            allowNull: true
        },
        descripcion:{
            type: Sequelize.TEXT,
            allowNull: true
        },
        url_demo:{
            type: Sequelize.STRING,
            allowNull: true
        },
        url_source:{
            type: Sequelize.STRING,
            allowNull: true
        },
        url_articulo:{
            type: Sequelize.STRING,
            allowNull: true
        },
        visitas: {
            type: Sequelize.INTEGER,
            allowNull: true
        }
    },{
        timestamps:false
    });
    return Portfolio;
}