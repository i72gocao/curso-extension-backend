module.exports =  (sequelize,Sequelize) => {
    const Comment = sequelize.define("comments",{

        texto:{
            type: Sequelize.TEXT
        }
    });
    return Comment;
}