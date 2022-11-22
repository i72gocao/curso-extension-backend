module.exports = (sequelize,Sequelize) => {
    const Post = sequelize.define("posts", {
        // id: {
        //     type: Sequelize.INTEGER,
        //     primaryKey: true,
        //     allowNull: false
        // },
        titulo: {
            type: Sequelize.STRING,
            allowNull: false
        },
        fecha: {
            type: Sequelize.DATE,
            allowNull: false
        },
        anio: {
            type: Sequelize.STRING,
            allowNull: true
        },
        descripcion: {
            type: Sequelize.TEXT,
            allowNull: false
        },
        breveDescripcion: {
            type: Sequelize.STRING,
            allowNull: true
        },
        contenido: {
            type: Sequelize.TEXT,
            allowNull: true
        }
        // categoria: {
        //     type: Sequelize.STRING,
        //     allowNull: true
        // }
    });
    return Post;
}