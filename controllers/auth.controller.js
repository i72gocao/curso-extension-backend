const db = require("../models");
const config = require("../config/auth.config");
//const User = db.user;//llama al modelo User
//const Role = db.role;//llama al modelo Role
const {user: User,role: Role, refreshToken: RefreshToken} = db;

const Op = db.Sequelize.Op;

/* Op contiene los siguientes elementos :
eq: Symbol(eq),
  ne: Symbol(ne),
  gte: Symbol(gte),
  gt: Symbol(gt),
  lte: Symbol(lte),
  lt: Symbol(lt),
  not: Symbol(not),
  is: Symbol(is),
  in: Symbol(in),
  notIn: Symbol(notIn),
  like: Symbol(like),
  notLike: Symbol(notLike),
  iLike: Symbol(iLike),
  notILike: Symbol(notILike),
  startsWith: Symbol(startsWith),
  endsWith: Symbol(endsWith),
  substring: Symbol(substring),
  regexp: Symbol(regexp),
  notRegexp: Symbol(notRegexp),
  iRegexp: Symbol(iRegexp),
  notIRegexp: Symbol(notIRegexp),
  between: Symbol(between),
  notBetween: Symbol(notBetween),
  overlap: Symbol(overlap),
  contains: Symbol(contains),
  contained: Symbol(contained),
  adjacent: Symbol(adjacent),
  strictLeft: Symbol(strictLeft),
  strictRight: Symbol(strictRight),
  noExtendRight: Symbol(noExtendRight),
  noExtendLeft: Symbol(noExtendLeft),
  and: Symbol(and),
  or: Symbol(or),
  any: Symbol(any),
  all: Symbol(all),
  values: Symbol(values),
  col: Symbol(col),
  placeholder: Symbol(placeholder),
  join: Symbol(join),
  match: Symbol(match)
*/

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req,res) => {
    User.create({
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password,8)
    }).then(user => {
        if(req.body.roles){
            Role.findAll({
                where: {
                    name: {
                        //Aqui si req.body.roles es un array de mas de un elemento entonces seria: where name = "admin" or name = "moderador"
                        [Op.or]: req.body.roles
                    }
                }
            }).then(roles => {
                user.setRoles(roles).then(() => {
                    res.send({message: "Usuario fue registrado satisfactoriamente aqui."});
                })
            })
        }else{
            user.setRoles([1]).then(() => {
                res.send({message: "Usuario fue registrado satisfactoriamente otro."});
            })
        }
    }).catch(err => {
        res.status(500).send({message: err.message})
    })
};

exports.signin = (req,res) => {
    // console.log("BODY: " + req.body.username);
    User.findOne({
        where: {
            username: req.body.username
        }
    }).then(async (user) => {
        if(!user) {
            return res.status(404).send({message: "Usuario no encontrado"});
        }

        const passwordIsValid = bcrypt.compareSync(req.body.password,user.password);

        if(!passwordIsValid){
            return res.status(401).send({
                accessToken: null,
                message: "Contraseña no válida."
            })
        }

        const token = jwt.sign({id: user.id}, config.secret,{ expiresIn: config.jwtExpiration });

        // let hasRefreshToken = true;
        let hasRefreshToken = await refreshTokenByUser(user);
        let refreshToken;

        //No existe un refreshToken tupla para un usuario con id
        if(!hasRefreshToken){
            refreshToken = await RefreshToken.createToken(user);
        }else{
            refreshToken = await refreshTokenByUser(user);
        }

        if(RefreshToken.verifyExpiration(refreshToken)){
            RefreshToken.destroy({where: {id: refreshToken.id}});
            res.status(403).json({
                message: "Refresh token ha expirado. Por favor realiza un nuevo login"
            })
            return;
        }

        refreshToken = await refreshTokenByUser(user);
        var authorities = [];
        await user.getRoles().then(roles => {
            for (let i = 0; i < roles.length; i++) {
                authorities.push("ROLE_"+roles[i].name.toUpperCase());
            }
            res.status(200).send({
                id: user.id,
                username: user.username,
                email: user.email,
                roles: authorities,
                accessToken: token,
                refreshToken: refreshToken
            });
        });
    }).catch(err => {
        res.status(500).send({message: err.message});
    });
};

exports.refreshToken = async (req,res) => {
    const { refreshToken: requestToken} = req.body;

    if(requestToken == null){
        return res.status(403).json({message: "Refresh token es necesario"});
    }

    try{
        let refreshToken = await RefreshToken.findOne(
            {
                where: { token: requestToken}
            }
        )

        if(!refreshToken){
            res.status(403).json({ message: "Refresh token no se encuentra en registro."});
            return;
        }

        if(RefreshToken.verifyExpiration(refreshToken)){
            RefreshToken.destroy({where: {id: refreshToken.id}});

            res.status(403).json({
                message: "Refresh token ha expirado. Por favor realiza un nuevo login"
            })

            return;
        }

        const user = await refreshToken.getUser();
        const newAccessToken = jwt.sign({id: user.id}, config.secret, {
            expiresIn: config.jwtExpiration
        });

        return res.status(200).json({
            accessToken: newAccessToken,
            refreshToken: refreshToken.token
        });
    }catch(err){
        return res.status(500).send({message: err});
    }
}

exports.isRefreshToken = (req,res) => {
    RefreshToken.findOne({
        where: {
            token: req.body.token
        }
    }).then(datos => {
        res.send({data: datos});
    });
}

const refreshTokenByUser = async (user) => {
    let datos = await RefreshToken.findOne({
        attributes: ["token","id","expiryDate","userId"],
        where: {
            userId : user.id
        },
        raw: true
    })

    return datos;
}