const knex = require('../../database/conexao')

const deletarProduto = async (req, res) => {
    try {
        const IdProduto = req.params.id;

        const existeProduto = await knex('produtos').where({ id: IdProduto }).first();
        if (!existeProduto) {
            return res.status(404).json({ mensagem: 'Produto não encontrado.' });
        }

        const pedidoComProduto = await knex('pedido_produtos')
            .where({ produto_id: IdProduto })
            .first();

        if (pedidoComProduto) {
            return res.status(400).json({ mensagem: 'O produto está vinculado a um pedido e não pode ser excluído.' });
        }
        const imagemDoProduto = await knex('produtos')
        .select('produto_imagem')
        .where({id: IdProduto})
        .first()

        if(imagemDoProduto){
            await knex('produtos')
                .select('produto_imagem')
                .where({id: IdProduto})
                .delete()
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
const knex = require('../../database/conexao')

const deletarProduto = async (req, res) => {
    try {
        const IdProduto = req.params.id;

        const existeProduto = await knex('produtos').where({ id: IdProduto }).first();
        if (!existeProduto) {
            return res.status(404).json({ mensagem: 'Produto não encontrado.' });
        }

        const pedidoComProduto = await knex('pedido_produtos')
            .where({ produto_id: IdProduto })
            .first();

        if (pedidoComProduto) {
            return res.status(400).json({ mensagem: 'O produto está vinculado a um pedido e não pode ser excluído.' });
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