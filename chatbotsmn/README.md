# chatbotsmn

This application was generated using the [NodeJS blueprint](https://github.com/jhipster/generator-jhipster-nodejs) of JHipster 6.6.0, you can find documentation and help at [https://www.jhipster.tech/documentation-archive/v6.6.0](https://www.jhipster.tech/documentation-archive/v6.6.0). For any questions you can refer to the stream lead: [Angelo Manganiello](https://github.com/amanganiello90).

This is a "microservice" application intended to be part of a microservice architecture, please refer to the [Doing microservices with JHipster][] page of the documentation for more information.

This application is configured for Service Discovery and Configuration with . On launch, it will refuse to start if it is not able to connect to .

## Development

To start your application in the dev profile, simply run:

    cd server && npm install
    npm start:app

For further instructions on how to develop with JHipster, have a look at [Using JHipster in development][].

### Using NestJS CLI

You can also use [NestJS CLI][] to generate some custom server code.

For example, the following command:

    nest generate module my-module

will generate the file:

    create server/src/my-component/my-component.module.ts

## Building and running

#### Running

```bash
npm start:app
```

#### Building

```bash
npm build:app
```

The build folder with all compiled sources will be **server/dist**.

> For more explanation about full stack server/client build refer to [server/README.md](server/README.md)

[jhipster homepage and latest documentation]: https://www.jhipster.tech
[jhipster 6.6.0 archive]: https://www.jhipster.tech/documentation-archive/v6.6.0
[doing microservices with jhipster]: https://www.jhipster.tech/documentation-archive/v6.6.0/microservices-architecture/
[using jhipster in development]: https://www.jhipster.tech/documentation-archive/v6.6.0/development/
[using docker and docker-compose]: https://www.jhipster.tech/documentation-archive/v6.6.0/docker-compose
[using jhipster in production]: https://www.jhipster.tech/documentation-archive/v6.6.0/production/
[running tests page]: https://www.jhipster.tech/documentation-archive/v6.6.0/running-tests/
[code quality page]: https://www.jhipster.tech/documentation-archive/v6.6.0/code-quality/
[setting up continuous integration]: https://www.jhipster.tech/documentation-archive/v6.6.0/setting-up-ci/
