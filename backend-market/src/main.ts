import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import 'dotenv/config';
import * as Express from 'express';
import * as cors from 'cors';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as vhost from 'vhost';
import * as serveStatic from 'serve-static';

if (process.env.NODE_ENV === 'test') {
  process.env.MONGO_URI = process.env.MONGO_URI_TEST;
  console.log('----------TESTING IN PROCESS----------');
}

const server = Express();
const studio = Express();
const simulator = Express();

simulator.use(serveStatic('simulator/dist'));
studio.use(serveStatic('studio/dist'));

server.use(cors());
server.use(vhost('app.chatbot.sh', studio));
server.use(vhost('simulator.chatbot.sh', simulator));
server.use(vhost('cdn.chatbot.sh', serveStatic('cdn')));
server.use(serveStatic('marketplace/dist'));

async function bootstrap() {
  const app = await NestFactory.create(AppModule, new ExpressAdapter(server));

  const options = new DocumentBuilder()
    .setTitle('API for Chatbot.sh')
    .setDescription('API for Chatbot.sh')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT || 5000);
}
bootstrap();