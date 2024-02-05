const knex = require('../../database/conexao');
const  transportador  = require('../../connection/transporteEmail');
const { schemaCadastroPedido } = require('../../validations/validacoesCadastrarPedido');
const  compiladorHtml  = require('../../templates/compiladorHtml');

const cadastrarPedido = async (req, res) => {
  const { error, value } = schemaCadastroPedido.validate(req.body);

  if (error) {
    return res.status(400).json({ mensagem: error.message });
  }

  const { cliente_id, observacao, pedido_produtos } = value;

  try {
   
    const cliente = await knex('clientes').where({ id: cliente_id }).first();
    if (!cliente) {
      return res.status(400).json({ mensagem: 'Cliente não encontrado.' });
    }

    
    for (const pedidoProduto of pedido_produtos) {
      const { produto_id, quantidade_produto } = pedidoProduto;

     
      const produto = await knex('produtos').where({ id: produto_id }).first();

    
      if (!produto) {
        return res.status(400).json({ mensagem: `Produto com ID ${produto_id} não encontrado.` });
      }

      if (produto.quantidade_estoque < quantidade_produto) {
        return res.status(400).json({ mensagem: `Estoque insuficiente para o produto com ID ${produto_id}.` });
      }
    }

    const total_centavos = await pedido_produtos.reduce(async (totalPromise, { produto_id, quantidade_produto }) => {
      const total = await totalPromise;
      const produto = await knex('produtos').where({ id: produto_id }).first();

     
      if (!produto) {
        throw new Error(`Produto com ID ${produto_id} não encontrado.`);
      }

      const valorProduto = produto.valor * quantidade_produto;
      if (isNaN(valorProduto) || isNaN(total)) {
        throw new Error('Valores de produtos inválidos.');
      }

      return total + valorProduto;
    }, Promise.resolve(0));

    
    if (isNaN(total_centavos)) {
      throw new Error('Valor total inválido.');
    }

    const novoPedido = await knex('pedidos')
      .insert({
        cliente_id,
        observacao,
        valor_total: total_centavos,
      })
      .returning('*');

    for (const pedidoProduto of pedido_produtos) {
      const { produto_id, quantidade_produto } = pedidoProduto;

      const produto = await knex('produtos').where({ id: produto_id }).first();

   
      await knex('pedido_produtos').insert({
        pedido_id: novoPedido[0].id,
        produto_id,
        quantidade_produto,
        valor_produto: quantidade_produto * produto.valor,
      });

 
      await knex('produtos')
        .where({ id: produto_id })
        .decrement('quantidade_estoque', quantidade_produto);
    }

    const contextoEmail = {
        nomecliente: cliente.nome,
        pedido: novoPedido[0].id,
        observacao: observacao,
        valor: total_centavos.toFixed(2),
        produtos: await Promise.all(pedido_produtos.map(async pedidoProduto => {
            const { produto_id, quantidade_produto } = pedidoProduto;
            const produto = await knex('produtos').where({ id: produto_id }).first();
    
            if (!produto) {
                throw new Error(`Produto com ID ${produto_id} não encontrado.`);
            }
    
            return {
                produto: {
                    descricao: produto.descricao,
                },
                quantidade_produto,
                valor_unitario: produto.valor,
                subtotal: quantidade_produto * produto.valor,
            };
        })),
    };
    const caminhoAbsoluto = require('path').join(__dirname, '../../templates/modeloEmail.html');
   
    
    const conteudoEmail = await compiladorHtml(caminhoAbsoluto, contextoEmail);
         transportador.sendMail({
      from: 'gbank970@gmail.com',
      to: cliente.email,
      subject: 'Confirmação da G9Bank - Pedido Efetuado com Sucesso',
      html: conteudoEmail,
    });

    return res.status(201).json({ mensagem: 'Pedido cadastrado com sucesso.' });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ mensagem: 'Erro interno do servidor' });
  }
};

module.exports = { cadastrarPedido };
