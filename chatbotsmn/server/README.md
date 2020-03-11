<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

[travis-image]: https://api.travis-ci.org/nestjs/nest.svg?branch=master
[travis-url]: https://travis-ci.org/nestjs/nest
[linux-image]: https://img.shields.io/travis/nestjs/nest/master.svg?label=linux
[linux-url]: https://travis-ci.org/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="blank">Node.js</a> framework for building efficient and scalable server-side applications, heavily inspired by <a href="https://angular.io" target="blank">Angular</a>.</p>
    <p align="center">
        <a href="https://www.npmjs.com/~nestjscore"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
        <a href="https://www.npmjs.com/~nestjscore"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
        <a href="https://www.npmjs.com/~nestjscore"><img src="https://img.shields.io/npm/dm/@nestjs/core.svg" alt="NPM Downloads" /></a>
        <a href="https://travis-ci.org/nestjs/nest"><img src="https://api.travis-ci.org/nestjs/nest.svg?branch=master" alt="Travis" /></a>
        <a href="https://travis-ci.org/nestjs/nest"><img src="https://img.shields.io/travis/nestjs/nest/master.svg?label=linux" alt="Linux" /></a>
        <a href="https://coveralls.io/github/nestjs/nest?branch=master"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#5" alt="Coverage" /></a>
        <a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
        <a href="https://opencollective.com/nest#backer"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
        <a href="https://opencollective.com/nest#sponsor"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
          <a href="https://paypal.me/kamilmysliwiec"><img src="https://img.shields.io/badge/Donate-PayPal-dc3d53.svg"/></a>
          <a href="https://twitter.com/nestframework"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
        </p>
          <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
          [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[NestJS Framework](https://github.com/nestjs/nest) server project generated from official [JHipster NodeJS blueprint](https://github.com/jhipster/generator-jhipster-nodejs).

## Installation

```bash
$ npm install
```

## TypeORM configuration

### Define your prod database

For prod database configuration,
in [src/orm.config.ts](src/orm.config.ts) change your **url** connection:

```ts
if(process.env.NODE_ENV==='prod'){
  ormconfig = {
      ...
      url: 'YOUR CONNECTION URL',
      logging: false,
      synchronize: commonConf.SYNCRONIZE,
      entities: commonConf.ENTITIES,
      migrations: commonConf.MIGRATIONS,
      cli: commonConf.CLI,
      migrationsRun: commonConf.MIGRATIONS_RUN,
  };
}

```

### Migration data and schema

According [typeORM migration guide](https://github.com/typeorm/typeorm/blob/master/docs/migrations.md),
there are under [src/migrations/](src/migrations/) the scripts to create the database schema and after to insert data seed.
The scripts are automatically run in the first start up, and after anymore.

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# build and run in production mode
$ set NODE_ENV=prod&& npm run build && npm run start:prod

# run production build with node
$ set NODE_ENV=prod&& node dist/main.js
```

> You can specify dev or prod NODE_ENV value (default is dev as indicated in [.env](.env))

## Lint

```bash
# run lint
$ npm run lint

# fix lint issues
$ npm run lint:fix

```

## Debug

```bash
# run this and after you can execute debug task in VSCode
$ npm run start:debug

```

## Test

```bash
# unit tests
$ npm run test

# lint
$ npm run lint

# fix lint issues
$ npm run lint:fix

# test coverage of unit tests
$ npm run test:cov

# e2e tests with full app coverage report
$ npm run test:e2e

```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Community - [jhipster homepage](https://www.jhipster.tech)
- Stream Lead - [Angelo Manganiello](https://github.com/amanganiello90)
- Website And Guide - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
