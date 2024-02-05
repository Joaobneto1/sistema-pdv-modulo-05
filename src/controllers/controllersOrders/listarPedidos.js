const knex = require('../../database/conexao')

const listarPedidos = async(req, res) => {
  try {

    const {cliente_id} = req.query;

    let query = knex('pedidos as p')
    .select(
      'p.id as pedido_id',
      'p.valor_total',
      'p.observacao',
      'p.cliente_id',
      'pp.id as produto_id',
      'pp.quantidade_produto',
      'pp.valor_produto',
      'pp.pedido_id',
      'pp.produto_id'
    )
    .leftJoin('pedido_produtos as pp', 'p.id', 'pp.pedido_id');

    if (cliente_id) {
      query = query.where('p.cliente_id', '=', cliente_id)
    };
    const pedidoEncontrado = await query;

    if (pedidoEncontrado.length < 1) {
      return res.json({mensagem: 'Não há registro de pedidos disponíveis'})
    }

    const pedidoFormatado = pedidoEncontrado.reduce((acumulador, pedido) => {
      const pedidoExistente = acumulador.find(item => item.pedido.id === pedido.pedido_id);

      if (pedidoExistente) {
        pedidoExistente.pedido_produtos.push({
          id: pedido.produto_id,
          quantidade_produto: pedido.quantidade_produto,
          valor_produto: pedido.valor_produto,
          pedido_id: pedido.pedido_id,
          produto_id: pedido.produto_id,
        });
      } else {
        acumulador.push({
          pedido: {
            id: pedido.pedido_id,
            valor_total: pedido.valor_total,
            observacao: pedido.observacao,
            cliente_id: pedido.cliente_id,
          },
          pedido_produtos: [
            {
              id: pedido.produto_id,
              quantidade_produto: pedido.quantidade_produto,
              valor_produto: pedido.valor_produto,
              pedido_id: pedido.pedido_id,
              produto_id: pedido.produto_id,
            },
          ],
        });
      }

      return acumulador;
    }, []);

    res.status(200).json(pedidoFormatado)
  } catch (error) {
    console.log(error.message);
    res.status(500).json({mensagem: 'Erro interno do servidor'});
  }
}

module.exports = {listarPedidos};