import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatFlowController } from '../web/rest/chat-flow.controller';
import { ChatFlowRepository } from '../repository/chat-flow.repository';
import { ChatFlowService } from '../service/chat-flow.service';

@Module({
  imports: [TypeOrmModule.forFeature([ChatFlowRepository])],
  controllers: [ChatFlowController],
  providers: [ChatFlowService],
  exports: [ChatFlowService]
})
export class ChatFlowModule {}
