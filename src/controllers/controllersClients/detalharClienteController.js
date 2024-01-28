const knex = require('../../database/conexao');

const detalharCliente = async (req, res) => {
    try {
        const { id } = req.params;

        const cliente = await knex('clientes').select('id', 'nome', 'email').where('id', id).first();

        if (!cliente) {
            return res.status(404).json({ mensagem: 'Cliente não encontrado' });
        }

        res.status(200).json(cliente);
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensagem: 'Erro interno do servidor. Consulte os logs para mais informações.' });
    }
};

module.exports = {
    detalharCliente
};