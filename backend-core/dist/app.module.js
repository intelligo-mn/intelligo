"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const auth_module_1 = require("./module/auth.module");
const orm_config_1 = require("./orm.config");
const chat_project_module_1 = require("./module/chat-project.module");
const chat_flow_module_1 = require("./module/chat-flow.module");
const chat_node_module_1 = require("./module/chat-node.module");
const section_module_1 = require("./module/section.module");
const button_module_1 = require("./module/button.module");
// jhipster-needle-add-entity-module-to-main-import - JHipster will import entity modules here, do not remove
// jhipster-needle-add-controller-module-to-main-import - JHipster will import controller modules here, do not remove
// jhipster-needle-add-service-module-to-main-import - JHipster will import service modules here, do not remove
let AppModule = class AppModule {
};
AppModule = __decorate([
    common_1.Module({
        imports: [
            typeorm_1.TypeOrmModule.forRoot(orm_config_1.ormconfig),
            auth_module_1.AuthModule,
            chat_project_module_1.ChatProjectModule,
            chat_flow_module_1.ChatFlowModule,
            chat_node_module_1.ChatNodeModule,
            section_module_1.SectionModule,
            button_module_1.ButtonModule
            // jhipster-needle-add-entity-module-to-main - JHipster will add entity modules here, do not remove
        ],
        controllers: [
        // jhipster-needle-add-controller-module-to-main - JHipster will add controller modules here, do not remove
        ],
        providers: [
        // jhipster-needle-add-service-module-to-main - JHipster will add service modules here, do not remove
        ]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map