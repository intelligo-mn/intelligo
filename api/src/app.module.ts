import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { CoreModule } from './core/core.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb://turtuvshin:turtuvshin1@ds211648.mlab.com:11648/chatbotsmn'), AuthModule, CoreModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
