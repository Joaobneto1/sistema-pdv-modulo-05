# 🧾 Sistema PDV - Desafio Backend Módulo 05

> Projeto em equipe desenvolvido como desafio final do módulo 05 da formação backend da [Cubos Academy](https://cubos.academy/), com foco em construção de API RESTful utilizando Node.js, PostgreSQL e envio de e-mails.
---

## 📦 Tecnologias

- **Node.js**
- **Express**
- **PostgreSQL**
- **Knex.js**
- **JWT**
- **SendGrid (e-mail)**
- **Cyclic (deploy)**
- **Bcrypt (hash de senhas)**
- **Multer / Blackblaze (upload de arquivos)**

---

## 📁 Estrutura de funcionalidades

- Autenticação com JWT
- CRUD completo para:
  - Usuários
  - Produtos
  - Clientes
  - Pedidos
- Upload e exclusão de imagem de produtos com Blackblaze
- Envio de e-mail automático ao cadastrar pedido

---

## 🧪 Teste a API

Clone o projeto, instale as dependências e configure o banco de dados com o script SQL disponível.

```bash
npm install
```

Configure o arquivo `.env` com as variáveis apropriadas:

```env
DB_HOST=
DB_PORT=
DB_USER=
DB_PASS=
DB_NAME=
SECRET_KEY=

HOST_EMAIL=
PORT_EMAIL=
USER_EMAIL=
API_EMAIL=

KEY_ID=
APP_KEY=
BUCKET_NAME=
ENDPOINT_BACKBLAZE=
```

---

## 💡 Observações

- Valores monetários são armazenados em centavos.
- As senhas dos usuários são criptografadas.
- Toda ação que modifica dados exige autenticação via Bearer Token.

---

## 👥 Projeto feito em parceria com:

- [Leonardo Guiato](https://github.com/LeoguiatoM5)
- [Mateus José Silva de Paula](https://github.com/Mateusjsp)
- [João Batista](https://github.com/Joaobneto1)
- [Victor Alkmim](https://github.com/victoralkmim)
- [Pedro Henrique S. Vitória](https://github.com/PedrohsVitoria)
- [Eduardo Otto Krieger](https://github.com/eduxotto)

---

## 🏁 Conclusão

Este projeto simula um sistema de frente de caixa (PDV), com múltiplas integrações de funcionalidades avançadas como envio de e-mail, autenticação segura, upload e gestão de produtos em tempo real. Foi uma experiência essencial para aprofundar o trabalho em equipe com Git/GitHub e consolidar conceitos sólidos de API REST.

---

###### `back-end` `nodeJS` `PostgreSQL` `API REST` `desafio` `autenticação` `upload`
