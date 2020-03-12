import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatNodeController } from '../web/rest/chat-node.controller';
import { ChatNodeRepository } from '../repository/chat-node.repository';
import { ChatNodeService } from '../service/chat-node.service';

@Module({
  imports: [TypeOrmModule.forFeature([ChatNodeRepository])],
  controllers: [ChatNodeController],
  providers: [ChatNodeService],
  exports: [ChatNodeService]
})
export class ChatNodeModule {}
