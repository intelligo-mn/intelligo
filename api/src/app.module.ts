import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb://turtuvshin:turtuvshin1@ds211648.mlab.com:11648/chatbotsmn'), AuthModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
