const express = require('express');
const { cadastrarUsuario } = require('../controllers/controllersUsers/cadastroUsuarioController');
const { listarCategorias } = require('../controllers/controllersCategory/categoriaController');
const verificarLogin = require('../middlewares/loginVerify');
const loginUsuario = require('../controllers/controllersUsers/loginController');
const editarUsuario = require('../controllers/controllersUsers/editarUsuario');
const { detalharUsuario } = require('../controllers/controllersUsers/detalharUsuarioController');
const { cadastrarProduto } = require('../controllers/controllersProduct/cadastrarProdutoController');


const router = express.Router();





router.get('/categoria', listarCategorias);

router.post('/usuario', cadastrarUsuario);

router.post('/login', loginUsuario)


router.use(verificarLogin)

router.get('/usuario', detalharUsuario);


router.put('/usuario', editarUsuario)


router.post('/produto', cadastrarProduto )


module.exports = router;
