# Desafio Trampay

## Boas vindas ao repositório do Desafio Técnico - Caso da empresa Trampay

A empresa **trampay** precisa de um site full-stack para o desenvolvimento de um sistema de login com criptografia, sistema de recuperação de senha e também que o usuário possa enviar um arquivo csv com dados de saldo e documentos de usuários. Esses dados devem ser registrados em um banco de dados. Para desenvolver o back-end da aplicação foram utilizadas as ferramentas **Node.js**, **Nest**, **Prisma**, **PostgreSQL**, **Bcrypt** e **JWT**.

---

## Deploy
Você pode acessar o deploy dessa [API aqui](https://trampay-backend.onrender.com/).

----

### Ferramentas necessárias para rodar a aplicação

- [Visual Studio Code](https://code.visualstudio.com/download) - para melhor visualização do código
- [Git](https://git-scm.com/downloads) - para clonar esse repositório
- [Node.js](https://nodejs.org/en/download/) - para instalar os pacotes de dependência
- [Postgres](https://www.postgresql.org/download/) - para armazenar os dados da aplicação


### Passo a passo para a inicialização

1. Clone o repositório usando o comando ` git clone https://github.com/matheus-carretta/trampay-backend.git `
2. Abra o diretório do projeto no seu editor de código
3. Instale as dependências do projeto executando o comando `npm install`
4. Crie um arquivo .env na raiz do projeto e configure as variáveis de ambiente necessárias (veja o arquivo .env.example para saber quais variáveis são necessárias)
5. Inicie um banco de dados PostgreSQL e execute as migrações do banco de dados executando o comando `npm prisma migrate dev`
6. Inicie o servidor de desenvolvimento executando o comando `npm run start:dev`

---
### Rotas da aplicação

- POST /login - endpoint para autenticação do usuário com email e senha.
- POST /send-recover-email - endpoint para recuperar a senha do usuário através do email.
- POST /user - endpoint para criar um usuário
- PATCH /user/reset-password/:token - endpoint para alterar a senha do usuário. O token vem do email.
- POST /balance - endpoint que recebe um csv. Os dados da tabela vão para a tabela balance.
---
### Próximos passos

- Desenvolver os testes unitários e de integração;
- Adicionar middlewares de validação;
- Fazer o tratamento de alguns erros.

## Agradecimento
Gostaria de agradecer a toda a equipe da [Trampay](https://trampay.com/) pela oportunidade e desafio fornecido.

Além disso, você também pode consultar o repositório do [front-end aqui](https://github.com/matheus-carretta/trampay-frontend).