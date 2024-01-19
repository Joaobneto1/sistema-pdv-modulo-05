const knex = require('../database/conexao');

const detalharUsuario = async (req, res) => {
    try {
        const userId = req.usuario.id;

        const usuario = await knex('usuarios').select('id', 'nome', 'email').where('id', userId).first();

        if (!usuario) {
            return res.status(404).json({ mensagem: 'Usuário não encontrado' });
        }

        res.status(200).json(usuario);
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensagem: 'Erro interno do servidor.' });
    }
};

module.exports = {
    detalharUsuario
};