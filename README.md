<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Premissas Assumidas no Desenvolvimento
## Tecnologias Utilizadas:

O sistema foi desenvolvido utilizando React para o frontend e Node.js (NestJS) para o backend.
O backend está neste repositorio, e o frontend neste: https://github.com/fukudaum/big-chat-brasil
O banco de dados utilizado foi postgres rodando em docker, utilizando Prisma.

## Dependências Externas:

Utilização do axios para realizar requisições HTTP para o servidor backend.
Uso do react-router-dom para navegação entre diferentes páginas na aplicação React.

## Autenticação e Autorização:

A autenticação não foi implementada neste sistema de demonstração.
As funcionalidades são acessíveis sem restrições de autenticação para fins de demonstração.

## Gerenciamento de Estado:

Utilização do useState e useEffect para gerenciamento de estado e efeitos colaterais nos componentes React.
Não foi utilizado um gerenciador de estado global (como Redux) devido à simplicidade e ao escopo do projeto.

## Estilização:

A estilização foi feita principalmente com CSS puro e classes CSS aplicadas diretamente nos elementos JSX.
A responsabilidade pela estilização ficou limitada ao escopo do componente, sem o uso de frameworks de UI externos.

## Testes Unitários:

Foram realizados os testes unitários apenas do módulo de usuários, apenas para fins de demonstração.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
# Passo a Passo para Execução do Sistema (README.md)

## Pré-requisitos
Certifique-se de ter Node.js e npm (ou yarn) instalados globalmente na sua máquina.

## Passos para Execução
### 1- Clonar o Repositório
### 2- Instalar Dependências
### 3- Configurar Variáveis de Ambiente
  Renomeie o arquivo .env.example para .env e configure as variáveis de ambiente necessárias, se aplicável.
### 4- Executar o Backend (NestJS)
  Iniciará o servidor backend localmente em http://localhost:3010.
### 5- Executar o Frontend (React)
  Iniciará o aplicativo React em desenvolvimento e abrirá automaticamente no navegador em http://localhost:30000.
### 6- Acessar o Aplicativo
  Abra seu navegador e navegue para http://localhost:3000 para acessar o aplicativo.
### 7- Utilização do Sistema
  Explore as diferentes funcionalidades conforme descrito nas seções específicas do README.md, como "Gerenciamento de Usuários", "Envio de Mensagens", etc.
### 8- Finalização
  Para interromper a execução do servidor backend ou do aplicativo React em desenvolvimento, use Ctrl + C no terminal correspondente.

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## License

Nest is [MIT licensed](LICENSE).
