import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ButtonController } from '../web/rest/button.controller';
import { ButtonRepository } from '../repository/button.repository';
import { ButtonService } from '../service/button.service';

@Module({
  imports: [TypeOrmModule.forFeature([ButtonRepository])],
  controllers: [ButtonController],
  providers: [ButtonService],
  exports: [ButtonService]
})
export class ButtonModule {}
