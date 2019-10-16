import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import 'dotenv/config';
import * as Express from 'express';
import * as cors from 'cors';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { uptimeBot } from './integrations/uptime-bot';
import * as vhost from 'vhost';
if (process.env.NODE_ENV === 'test') {
  process.env.MONGO_URI = process.env.MONGO_URI_TEST;
  console.log('----------TESTING IN PROCESS----------');
}

const server = Express();
const marketplace = Express();
const studio = Express();
const simulator = Express();
server.use(cors());
server.use(uptimeBot);
server.get('/', (req, res) => res.send('ok'));
server.use(
  vhost('demo.chatbots.mn', (req, res) => {
    res.end('hello vhost demo desu');
  }),
);
async function bootstrap() {
  const app = await NestFactory.create(AppModule, new ExpressAdapter(server));

  const options = new DocumentBuilder()
    .setTitle('API for Chatbots.mn')
    .setDescription('API for Chatbots.mn')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT || 5000);
}
bootstrap();
