const knex = require('../../database/conexao');
const { excluirImagem, uploadImagem } = require('../../services/upload');
const { schemaEditarProduto } = require('../../validations/validacoesEditarProduto');

const editarProduto = async (req, res) => {
    const IdProduto = req.params.id;
    const { error, value } = schemaEditarProduto.validate(req.body);

    if (error) {
        return res.status(400).json({ mensagem: error.message });
    }

    const { descricao, quantidade_estoque, valor, categoria_id } = value;

    try {
        const categoriaExistente = await knex("categorias")
            .where("id", categoria_id)
            .first();

        if (!categoriaExistente) {
            return res.status(404).json({ mensagem: 'A categoria informada não existe.' });
        }

        let produtoEditado = await knex('produtos')
            .where({ id: IdProduto })
            .update({
                descricao,
                quantidade_estoque,
                valor,
                categoria_id,
            });

        if (!produtoEditado) {
            return res.status(404).json({ mensagem: 'Produto não existe' });
        }

        if (req.file) {
            const { originalname, mimetype, buffer } = req.file;
            await excluirImagem(produtoEditado.produto_imagem);
            const upload = await uploadImagem(`produtos/${IdProduto}/${originalname}`, buffer, mimetype);

            produtoEditado = await knex('produtos')
                .where({ id: IdProduto })
                .update({
                    produto_imagem: upload.path
                }, ['produto_imagem']);
        }

        return res.status(200).json({ mensagem: 'Produto atualizado com sucesso.', produto: produtoEditado });
    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro interno do servidor' });
    }
};

module.exports = editarProduto;