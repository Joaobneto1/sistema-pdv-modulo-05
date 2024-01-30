const express = require('express');
const { cadastrarUsuario } = require('../controllers/controllersUsers/cadastroUsuarioController');
const { listarCategorias } = require('../controllers/controllersCategory/categoriaController');
const verificarLogin = require('../middlewares/loginVerify');
const loginUsuario = require('../controllers/controllersUsers/loginController');
const editarUsuario = require('../controllers/controllersUsers/editarUsuario');
const { detalharUsuario } = require('../controllers/controllersUsers/detalharUsuarioController');
const { cadastrarProduto } = require('../controllers/controllersProduct/cadastrarProdutoController');
const detalharProduto = require('../controllers/controllersProduct/detalharProdutoController');
const { cadastrarCliente } = require('../controllers/controllersClients/cadastrarClienteController');
const { deletarProduto } = require('../controllers/controllersProduct/excluirProdutoController');
const { detalharCliente } = require('../controllers/controllersClients/detalharClienteController');
const { listarClientes } = require('../controllers/controllersClients/listarClientesController');
const editarProduto = require('../controllers/controllersProduct/editarProduto');
const { editarDadosCliente } = require('../controllers/controllersClients/editarClienteController');
const { cadastrarPedido } = require('../controllers/controllersOrders/cadastrarPedido');


const router = express.Router();

router.get('/categoria', listarCategorias);
router.post('/usuario', cadastrarUsuario);
router.post('/login', loginUsuario)
router.use(verificarLogin)
router.get('/usuario', detalharUsuario);
router.put('/usuario', editarUsuario)
router.post('/produto', cadastrarProduto)


router.put('produto/:id', editarProduto)

router.get('/produto/:id', detalharProduto)
router.post('/cliente', cadastrarCliente)
router.get('/cliente', listarClientes)
router.get('/cliente/:id', detalharCliente)

router.put('/cliente/:id', editarDadosCliente);

router.delete('/produto/:id', deletarProduto);

router.post('/pedido', cadastrarPedido)

module.exports = router;
