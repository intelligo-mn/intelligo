require('dotenv').config({ path: '.env' });
import { NestFactory } from '@nestjs/core';
import cloudConfigClient from 'cloud-config-client';
import { AppModule } from './app.module';
import { setupSwagger } from './swagger';
import { config } from './config';
import { Logger, ValidationPipe, BadRequestException } from '@nestjs/common';
import * as express from 'express';
import * as path from 'path';
import * as fs from 'fs';
const logger: Logger = new Logger('Main');

async function bootstrap(): Promise<void> {
  loadCloudConfig();
  registerAsEurekaService();

  const appOptions = { cors: true };
  const app = await NestFactory.create(AppModule, appOptions);
  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (): BadRequestException => new BadRequestException('Validation error')
    })
  );

  const staticClientPath = path.join(__dirname, '../dist/classes/static');
  if (fs.existsSync(staticClientPath)) {
    app.use(express.static(staticClientPath));
    logger.log(`Serving static client resources on ${staticClientPath}`);
  }

  setupSwagger(app);

  await app.listen(config.get('server.port'));
  logger.log(`Application listening on port ${config.get('server.port')}`);
}

async function loadCloudConfig(): Promise<void> {
  const useJHipsterRegistry = false && config.get('eureka.client.enabled');
  if (useJHipsterRegistry) {
    const endpoint = config.get('cloud.config.uri') || 'http://admin:admin@localhost:8761/config';
    logger.log(`Loading cloud config from ${endpoint}`);

    const cloudConfig = await cloudConfigClient.load({
      context: process.env,
      endpoint,
      name: config.get('cloud.config.name'),
      profiles: config.get('cloud.config.profile') || ['prod']
      // auth: {
      //   user: config.get('jhipster.registry.username') || 'admin',
      //   pass: config.get('jhipster.registry.password') || 'admin'
      // }
    });
    config.addAll(cloudConfig.properties);
  }
}

function registerAsEurekaService(): void {
  const useJHipsterRegistry = false && config.get('eureka.client.enabled');
  if (useJHipsterRegistry) {
    logger.log(`Registering with eureka ${config.get('cloud.config.uri')}`);
    const Eureka = require('eureka-js-client').Eureka;
    const eurekaUrl = require('url').parse(config.get('cloud.config.uri'));
    const client = new Eureka({
      instance: {
        app: config.get('eureka.instance.appname'),
        instanceId: config.get('eureka.instance.instanceId'),
        hostName: config.get('ipAddress') || 'localhost',
        ipAddr: config.get('ipAddress') || '127.0.0.1',
        port: {
          $: config.get('server.port'),
          '@enabled': 'true'
        },
        vipAddress: config.get('ipAddress') || 'localhost',
        statusPageUrl: `http://${config.get('ipAddress')}:${config.get('server.port')}/`,
        dataCenterInfo: {
          '@class': 'com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo',
          name: 'MyOwn'
        }
      },
      eureka: {
        // eureka server host / port
        host: eurekaUrl.hostname || '127.0.0.1',
        port: eurekaUrl.port || 8761,
        servicePath: '/eureka/apps'
      },
      requestMiddleware: (requestOpts, done): any => {
        requestOpts.auth = {
          user: config.get('jhipster.registry.username') || 'admin',
          password: config.get('jhipster.registry.password') || 'admin'
        };
        done(requestOpts);
      }
    });
    client.logger.level('debug');
    client.start(error => logger.log(error || 'Eureka registration complete'));
  }
}

bootstrap();
