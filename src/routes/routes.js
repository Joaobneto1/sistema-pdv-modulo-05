const express = require('express');
const { cadastrarUsuario } = require('../controllers/cadastroUsuarioController');
const { listarCategorias } = require('../controllers/categoriaController');
const verificarLogin = require('../middlewares/loginVerify');
const loginUsuario = require('../controllers/loginController');
const editarUsuario = require('../controllers/editarUsuario');
const { detalharUsuario } = require('../controllers/detalharUsuarioController');


const router = express.Router();




router.get('/categoria', listarCategorias);

router.post('/usuario', cadastrarUsuario);

router.post('/login', loginUsuario)

router.use(verificarLogin)

router.get('/usuario', detalharUsuario);

router.put('/usuario', editarUsuario)

module.exports = router;
