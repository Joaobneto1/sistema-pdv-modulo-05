const knex = require("../database/conexao");
const jwt = require("jsonwebtoken");

const verificarLogin = async (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).json({
            mensagem:
                "Para acessar este recurso um token de autenticação válido deve ser enviado.",
        });
    }
  
    const token = authorization.split(" ")[1];

    try {
        const { id } = jwt.verify(token, process.env.SECRET_KEY);

        const [usuario] = await knex('usuarios').select('*').where('id', id);

        if (!usuario) {
            return res.status(401).json({
                mensagem:
                    "Para acessar este recurso um token de autenticação válido deve ser enviado.",
            });
        }

        const { senhaUsuario, ...usuarioSemSenha  } = usuario;

        req.usuario = usuarioSemSenha;
        next();
    } catch (error) {
        console.log(error.message);
        return res.status(401).json({
            mensagem:
                "Para acessar este recurso um token de autenticação válido deve ser enviado.",
        });
    }
};

module.exports = verificarLogin;