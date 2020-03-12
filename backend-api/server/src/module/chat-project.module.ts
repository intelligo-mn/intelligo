import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatProjectController } from '../web/rest/chat-project.controller';
import { ChatProjectRepository } from '../repository/chat-project.repository';
import { ChatProjectService } from '../service/chat-project.service';

@Module({
  imports: [TypeOrmModule.forFeature([ChatProjectRepository])],
  controllers: [ChatProjectController],
  providers: [ChatProjectService],
  exports: [ChatProjectService]
})
export class ChatProjectModule {}
