# Repositório do projeto Car Shop 🚗

## Módulo: BACK-END

 Repositório possuí projeto desenvolvido no período que estive na **Trybe**, abordando os conceitos de **API Rest** com CRUD completo em **TypeScript**, com utilização da ODM **Mongoose**, além de construir o projeto de acordo com o paradigma de orientação a objetos (**POO**) e **SOLID**. **Docker** para rodar o node e mongodb. Utilizando a arquitetura **MSC**. </br>
Para testar a abordagem foram usados testes via **Mocha**, **Chai**, **Sinon**, com abordagem variando entre **TDD** e **BDD**;

## Informações de aprendizados

- Este é um projeto desenvolvido para me ajudar a aprender `TypeScript`, `MongoDB` e `Mongoose`;
- Segundo projeto usando `MongoDB`;
- Primeiro projeto usando `Mongoose`;
- Utilizei o Cliente Rest `Thunder Client`, como extensão, para visualizar o retorno do meu acesso.

## Linguagem usadas

[![NodeJS][NodeJS-logo]][NodeJS-url]
[![Docker][Docker-logo]][Docker-url]
[![ESLint][ESLint-logo]][ESLint-url]
[![TypeScript][TypeScript-logo]][TypeScript-url]
[![ts-node][ts-node-logo]][ts-node-url]
[![Express][Express-logo]][Express-url]
[![Mongo][Mongo-logo]][Mongo-url]
[![Mongoose][Mongoose-logo]][Mongoose-url]
[![.ENV][.ENV-logo]][.ENV-url]
[![Jest][Jest-logo]][Jest-url]
[![Mocha][Mocha-logo]][Mocha-url]
[![Chai][Chai-logo]][Chai-url]

## O que foi desenvolvido

Para este projeto, foram aplicados os princípios de Programação Orientada a Objetos (POO) para a construção de uma API com CRUD para gerenciar uma concessionária de veículos. Em TypeScript, utilizando o banco de dados MongoDB através do framework do Mongoose.

## Instruções para instalar e rodar

1. Clone o repo:

    ```bash
    git clone git@github.com:Ludson96/project-car-shop.git
    ```

1. Entre na pasta do repositório que você acabou de clonar:

    ```bash
    cd project-car-shop
    ```

1. Instale as dependências e inicialize o projeto:

    ```bash
    npm install
    ```

1. Rode os serviços `node` e `db` com o comando, através do docker:

    ```bash
    docker-compose up -d
    ```

## Endpoints

Abaixo você pode conferir um detalhamento dos endpoints utilizados no projeto. Para realizar as requisições HTTP e consultar o comportamento de cada endpoint, você pode utilizar a extensão [Thunder Client](https://www.thunderclient.com/).

> ℹ️ Para todos os endpoints que exijam o id dos carros e motos, atente-se que o id é um `ObjectId`. Saiba mais sobre ObjectId [aqui](https://www.mongodb.com/docs/manual/reference/bson-types/#objectid).

<details>

  <summary><strong>Cars</strong></summary>

### GET /cars

- Retorna todos os carros registrados no banco de dados.
- URL: `http://localhost:PORT/cars`

### POST /cars

- Adiciona um novo carro ao banco de dados.
- URL: `http://localhost:PORT/cars`
- O corpo da requisição deve seguir o formato abaixo:

```
{
  "model": "Marea",
  "year": 2002,
  "color": "Black",
  "status": true, // Não é obrigatório. Se não for inserido, o valor do status será 'false'
  "buyValue": 15.990,
  "doorsQty": 4,
  "seatsQty": 5
}
```

### GET /cars/:id

- Retorna o carro cujo id foi passado na URL.
- Exemplo de URL: `http://localhost:PORT/cars/634852326b35b59438fbea2f`

### PUT /cars/:id

- Atualiza o carro cujo id foi passado na URL.
- Exemplo de URL: `http://localhost:PORT/cars/634852326b35b59438fbea2f`
- O corpo da requisição deve seguir o formato abaixo:

```
{
  "model": "Marea",
  "year": 1992,
  "color": "Red",
  "status": true, // Não é obrigatório. Se não for inserido, o valor do status será 'false'
  "buyValue": 12.000,
  "doorsQty": 2,
  "seatsQty": 5
}
```

### DELETE /cars/:id

- Remove do banco de dados o carro cujo id foi passado na URL.
- Exemplo de URL: `http://localhost:PORT/cars/634852326b35b59438fbea2f`

---

</details>

<details>

  <summary><strong>Motorcycles</strong></summary>

### GET /motorcycles

- Retorna todas as motos registradas no banco de dados.
- URL: `http://localhost:PORT/motorcycles`

### POST /motorcycles

- Adiciona uma nova moto ao banco de dados.
- URL: `http://localhost:PORT/motorcycles`
- O corpo da requisição deve seguir o formato abaixo:

```
{
  "model": "Honda Cb 600f Hornet",
  "year": 2005,
  "color": "Yellow",
  "status": true, // Não é obrigatório. Se não for inserido, o valor do status será 'false'
  "buyValue": 30.000,
  "category": "Street", // Valores aceitos: "Street", "Custom" ou "Trail"
  "engineCapacity": 600
}
```

### GET /motorcycles/:id

- Retorna a moto cujo id foi passado na URL.
- Exemplo de URL: `http://localhost:PORT/motorcycles/634852326b35b59438fbea2f`

### PUT /motorcycles/:id

- Atualiza a moto cujo id foi passado na URL.
- Exemplo de URL: `http://localhost:PORT/motorcycles/634852326b35b59438fbea2f`
- O corpo da requisição deve seguir o formato abaixo:

```
{
  "model": "Honda Cb 600f Hornet",
  "year": 2014,
  "color": "Red",
  "status": true, // Não é obrigatório. Se não for inserido, o valor do status será 'false'
  "buyValue": 45.000,
  "category": "Street", // Valores aceitos: "Street", "Custom" ou "Trail"
  "engineCapacity": 600
}
```

### DELETE /motorcycles/:id

- Remove do banco de dados a moto cujo id foi passado na URL.
- Exemplo de URL: `http://localhost:PORT/motorcycles/634852326b35b59438fbea2f`

---

</details>

<br/>

> `docker-compose.yml` fornecidos pela Trybe.

[Express-logo]: https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB
[Express-url]: https://expressjs.com
[NodeJS-logo]: https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white
[NodeJS-url]: https://nodejs.org/en/
[Mongo-url]:https://www.mongodb.com/
[Mongo-logo]: https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white
[Docker-logo]: https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white
[Docker-url]: https://www.docker.com
[ESLint-logo]: https://img.shields.io/badge/ESLint-4B3263?style=for-the-badge&logo=eslint&logoColor=white
[ESLint-url]: https://eslint.org/
[TypeScript-logo]: https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white
[TypeScript-url]: https://www.typescriptlang.org/
[ts-node-logo]: https://img.shields.io/badge/ts--node-3178C6?logo=tsnode&logoColor=fff&style=for-the-badge
[ts-node-url]: https://www.npmjs.com/package/ts-node-dev
[.ENV-logo]: https://img.shields.io/badge/.ENV-ECD53F?logo=dotenv&logoColor=000&style=for-the-badge
[.ENV-url]: https://www.npmjs.com/package/dotenv
[Mongoose-url]: https://mongoosejs.com/
[Mongoose-logo]: https://img.shields.io/badge/Mongoose-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white
[Jest-logo]: https://img.shields.io/badge/-jest-%23C21325?style=for-the-badge&logo=jest&logoColor=white
[Jest-url]: https://jestjs.io
[Chai-logo]: https://img.shields.io/badge/Chai-A30701?logo=chai&logoColor=fff&style=for-the-badge
[Chai-url]: https://www.chaijs.com
[Mocha-logo]: https://img.shields.io/badge/-mocha-%238D6748?style=for-the-badge&logo=mocha&logoColor=white
[Mocha-url]: https://mochajs.org
