const knex = require('../../database/conexao');
const { excluirImagem, uploadImagem } = require('../../services/upload');


const editarProduto = async (req, res) => {
    console.log('Iniciando a função editarProduto');



    if (isNaN(id)) {
        console.error('ID inválido:', id);
        return res.status(400).json({ mensagem: 'O ID fornecido não é válido.' });
    }


    const { descricao, quantidade_estoque, valor, categoria_id, produto_imagem } = req.body;
    if (!descricao || !quantidade_estoque || !valor || !categoria_id) {
        console.error('Campos obrigatórios não fornecidos.');
        return res.status(400).json({ mensagem: 'Todos os campos obrigatórios devem ser fornecidos.' });
    }

   
    if (isNaN(categoria_id)) {
        console.error('ID da categoria inválido:', categoria_id);
        return res.status(400).json({ mensagem: 'O ID da categoria fornecido não é válido.' });
    }

    try {
        const categoriaExistente = await knex("categorias")
            .where("id", categoria_id)
            .first();

        if (!categoriaExistente) {
            console.error('Categoria não encontrada');
            return res.status(404).json({ mensagem: 'A categoria informada não existe.' });
        }

        let produtoEditado = await knex('produtos')
            .where({ id: id })
            .update({
                descricao,
                quantidade_estoque,
                valor,
                categoria_id,
            });

        if (!produtoEditado) {
            console.error('Produto não encontrado');
            return res.status(404).json({ mensagem: 'Produto não existe' });
        }

        if (req.file) {
            const { originalname, mimetype, buffer } = req.file;
            await excluirImagem(produto_imagem);
            const upload = await uploadImagem(
                `produtos/${id}/${originalname}`,
                buffer,
                mimetype
            );
            await knex('produtos')
                .where({ id: id })
                .update({
                    produto_imagem: upload.path
                });
        }

        produtoEditado = await knex('produtos')
            .where({ id: id })
            .first();

        return res.status(200).json({ mensagem: 'Produto atualizado com sucesso.', produto: produtoEditado });
    } catch (error) {
        console.error('Erro durante a execução de editarProduto:', error);
        res.status(500).json({ mensagem: 'Erro interno do servidor' });
    }
};

module.exports = editarProduto;