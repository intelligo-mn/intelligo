import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SectionController } from '../web/rest/section.controller';
import { SectionRepository } from '../repository/section.repository';
import { SectionService } from '../service/section.service';

@Module({
  imports: [TypeOrmModule.forFeature([SectionRepository])],
  controllers: [SectionController],
  providers: [SectionService],
  exports: [SectionService]
})
export class SectionModule {}
