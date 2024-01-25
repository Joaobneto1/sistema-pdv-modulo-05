const deletarProduto = async (req, res) => {
    try {
        const IdProduto = req.params.id;

        const existeProduto = await knex('produtos').where({ id: IdProduto }).first();
        if (!existeProduto) {
            return res.status(404).json({ mensagem: 'Produto não encontrado.' });
        }

        await knex('produtos').where({ id: IdProduto }).delete();

        res.status(200).json({ mensagem: 'Produto excluído com sucesso.' });
    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro no servidor.' });
    }
};

module.exports = {
    deletarProduto
}