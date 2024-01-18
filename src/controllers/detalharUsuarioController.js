const knex = require('../database/conexao');
const jwt = require('jsonwebtoken');

const detalharUsuario = async (req, res) => {
    try {
        const token = extrairTokenAutorizacao(req);

        if (!token) {
            return res.status(401).json({ mensagem: 'Token inválido' });
        }

        const userId = extrairUserIdDoToken(token);

        if (!userId) {
            return res.status(401).json({ mensagem: 'Token inválido' });
        }

        const usuario = await obterUsuarioPorId(userId);

        if (!usuario) {
            return res.status(404).json({ mensagem: 'Usuário não encontrado' });
        }

        res.status(200).json(usuario);
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensagem: 'Erro interno do servidor.' });
    }
};

const extrairTokenAutorizacao = (req) => {
    const authorizationHeader = req.headers['authorization'];

    return authorizationHeader ? authorizationHeader.split(' ')[1] : null;
};

const extrairUserIdDoToken = (token) => {
    try {
        const decodedToken = jwt.decode(token);
        return decodedToken ? decodedToken.id : null;
    } catch (error) {
        console.error('Erro ao decodificar o token:', error);
        return null;
    }
};

const obterUsuarioPorId = async (userId) => {
    return await knex('usuarios').select('id', 'nome', 'email').where('id', userId).first();
};


module.exports = {
    detalharUsuario
};