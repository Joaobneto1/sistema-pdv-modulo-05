const conexao = require("../../database/conexao");
const { schemaCadastroProduto } = require("../../validations/validacoesCadastroProduto");



const cadastrarProduto = async (req, res) => {
  
    const { error, value } = schemaCadastroProduto.validate(req.body);

    if (error) {
      return res.status(400).json({ mensagem: error.message });
    }

    const { descricao, quantidade_estoque, valor, categoria_id } = value;

    try {
   
    
    const categoriaExistente = await conexao("categorias")
      .where("id", categoria_id)
      .first();

    if (!categoriaExistente) {
      return res.status(400).json({ mensagem: 'A categoria informada não existe.' });
    }

    
    const produtoCadastrado = await conexao("produtos")
      .insert({
        descricao,
        quantidade_estoque,
        valor,
        categoria_id,
      })
      .returning(['id', 'descricao', 'quantidade_estoque', 'valor', 'categoria_id']);

    return res.status(201).json({ mensagem: 'Produto cadastrado com sucesso.', produto: produtoCadastrado[0] });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ mensagem: 'Erro interno do servidor.' });
  }
};

module.exports = { cadastrarProduto };