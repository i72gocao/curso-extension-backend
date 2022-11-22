module.exports = (sequelize,Sequelize) => {
    const Curso = sequelize.define("cursos", {
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
        min_participantes: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        max_participantes: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        subs_participantes: {
            type: Sequelize.INTEGER,
            allowNull: true
        },
        imagen_portada : {
            type: Sequelize.TEXT,
            allowNull: true
        }
    });
    return Curso;
}