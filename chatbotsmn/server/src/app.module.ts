import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './module/auth.module';
import { ormconfig } from './orm.config';
import { ChatProjectModule } from './module/chat-project.module';
import { ChatFlowModule } from './module/chat-flow.module';
import { ChatNodeModule } from './module/chat-node.module';
import { SectionModule } from './module/section.module';
import { ButtonModule } from './module/button.module';
// jhipster-needle-add-entity-module-to-main-import - JHipster will import entity modules here, do not remove
// jhipster-needle-add-controller-module-to-main-import - JHipster will import controller modules here, do not remove
// jhipster-needle-add-service-module-to-main-import - JHipster will import service modules here, do not remove

@Module({
  imports: [
    TypeOrmModule.forRoot(ormconfig),
    AuthModule,
    ChatProjectModule,
    ChatFlowModule,
    ChatNodeModule,
    SectionModule,
    ButtonModule
    // jhipster-needle-add-entity-module-to-main - JHipster will add entity modules here, do not remove
  ],
  controllers: [
    // jhipster-needle-add-controller-module-to-main - JHipster will add controller modules here, do not remove
  ],
  providers: [
    // jhipster-needle-add-service-module-to-main - JHipster will add service modules here, do not remove
  ]
})
export class AppModule {}
