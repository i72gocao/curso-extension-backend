module.exports = (sequelize,Sequelize) => {
    const Course = sequelize.define("courses", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        titulo: {
            type: Sequelize.STRING,
            allowNull: false
        },
        descripcion: {
            type: Sequelize.TEXT,
            allowNull: true
        },
        precio: {
            type: Sequelize.FLOAT,
            allowNull: false
        },
        fecha_inicio: {
            type: Sequelize.DATE,
            allowNull: false
        },
        fecha_fin: {
            type: Sequelize.DATE,
            allowNull: false
        },
        fecha_limite_subscripcion:{
            type: Sequelize.DATE,
            allowNull: false
        },
        min_participantes: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        max_participantes: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        //No hace falta, va en la tabla M:N crada entre cursos y usuarios
        //subs_participantes: {
            //Son los participantes que ya se han inscrito en el curso.
            //type: Sequelize.INTEGER,
            //allowNull: true
        //},
        imagen_portada : {
            type: Sequelize.TEXT,
            allowNull: true
        }
    });
    return Course;
}