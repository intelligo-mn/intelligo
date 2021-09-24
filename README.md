# chatbot.sh

Conversational AI platform.

### Platform Apps

| Apps             |                                                    Web |                                                                                                                                                                     Github Actions | Status |
| ---------------- | -----------------------------------------------------: | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | -----: |
| ![][api-chatbot] |         **[api.chatbots.mn](https://api.chatbots.mn)** |         [![Build Status](https://github.com/intelligo-systems/chatbots.mn/workflows/backend/badge.svg)](https://github.com/intelligo-systems/chatbots.mn/actions?workflow=backend) | ![][heroku]       |
| ![][stu-chatbot] |             [app.chatbots.mn](https://app.chatbots.mn) |           [![Build Status](https://github.com/intelligo-systems/chatbots.mn/workflows/studio/badge.svg)](https://github.com/intelligo-systems/chatbots.mn/actions?workflow=studio) | ![][heroku]       |
| ![][sim-chatbot] | [simulator.chatbots.mn](https://simulator.chatbots.mn) |     [![Build Status](https://github.com/intelligo-systems/chatbots.mn/workflows/simulator/badge.svg)](https://github.com/intelligo-systems/chatbots.mn/actions?workflow=simulator) | ![][heroku]       |
| ![][www-chatbot] |             [www.chatbots.mn](https://www.chatbots.mn) | [![Build Status](https://github.com/intelligo-systems/chatbots.mn/workflows/marketplace/badge.svg)](https://github.com/intelligo-systems/chatbots.mn/actions?workflow=marketplace) | ![][heroku]      |

### Tech stack

[<img src="https://github.com/intelligo-systems/jisho.mn/blob/master/.github/assets/stack.png"/>](https://chatbots.mn)

## Backend API

[NestJS Framework](https://github.com/nestjs/nest) backend project.

### Installation

```bash
$ npm install
```

### TypeORM configuration

#### Define your prod database

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

#### Migration data and schema

According [typeORM migration guide](https://github.com/typeorm/typeorm/blob/master/docs/migrations.md),
there are under [src/migrations/](src/migrations/) the scripts to create the database schema and after to insert data seed.
The scripts are automatically run in the first start up, and after anymore.

### Running the app

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

### Lint

```bash
# run lint
$ npm run lint

# fix lint issues
$ npm run lint:fix

```

### Debug

```bash
# run this and after you can execute debug task in VSCode
$ npm run start:debug

```

### Test

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

## Angular Dashboard

[<img src="https://raw.githubusercontent.com/creativetimofficial/public-assets/master/logos/angular-logo.png" width="60" height="60" style="background:white;"/>](https://www.creative-tim.com/product/argon-dashboard-pro-angular)

### Development server

`ng serve` комманд ажиллуулж dev server ажиллуулна. Вэб хөтөч дээр `http://localhost:4200/` гэсэн холбоос дээр ажиллана. 

### Build хийх

`ng build` гэсэн коммандаар апп build хийнэ. Build хийсэн файл нь `dist/` хавтасанд байрлана. `--prod` flag ашиглан production build хийнэ.

### Unit test ажиллуулах

`ng test` [Karma](https://karma-runner.github.io).

### End-to-end test хийх

`ng e2e` [Protractor](http://www.protractortest.org/).

### Browser Support

At present, we officially aim to support the last two versions of the following browsers:

<img src="https://s3.amazonaws.com/creativetim_bucket/github/browser/chrome.png" width="64" height="64"> <img src="https://s3.amazonaws.com/creativetim_bucket/github/browser/firefox.png" width="64" height="64"> <img src="https://s3.amazonaws.com/creativetim_bucket/github/browser/edge.png" width="64" height="64"> <img src="https://s3.amazonaws.com/creativetim_bucket/github/browser/safari.png" width="64" height="64"> <img src="https://s3.amazonaws.com/creativetim_bucket/github/browser/opera.png" width="64" height="64">

### Development time 

Development time from 2020-11-15 [![time tracker](https://wakatime.com/badge/github/intelligo-io/chatbots.mn.svg)](https://wakatime.com/badge/github/intelligo-io/chatbots.mn)

## License

> Copyright (C) 2019-2020 Intelligo LLC.  
> Chatbot.sh licensed under the [INTELLIGO](./LICENSE) license.  
> (See the [LICENSE](./LICENSE) file for the whole license text.)

[api-chatbot]: https://img.shields.io/badge/backend-chatbots.mn-007acc?style=flat-square&logo=node.js&logoWidth=18
[stu-chatbot]: https://img.shields.io/badge/studio-chatbots.mn-007acc?style=flat-square&logo=angular&logoWidth=32
[sim-chatbot]: https://img.shields.io/badge/simulator-chatbots.mn-007acc?style=flat-square&logo=angular
[www-chatbot]: https://img.shields.io/badge/www-chatbots.mn-007acc?style=flat-square&logo=angular&logoWidth=37

[heroku]: https://img.shields.io/badge/heroku-DEPLOYED-40a6bc?style=flat&logo=heroku&labelColor=0d1d25
