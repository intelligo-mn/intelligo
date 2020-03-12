"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const logging_interceptor_1 = require("../../client/interceptors/logging.interceptor");
const swagger_1 = require("@nestjs/swagger");
let ManagementController = class ManagementController {
    constructor() {
        this.logger = new common_1.Logger('ManagementController');
    }
    info() {
        return {
            activeProfiles: 'no',
            'display-ribbon-on-profiles': 'no'
        };
    }
};
__decorate([
    swagger_1.ApiExcludeEndpoint(),
    common_1.Get('/info'),
    swagger_1.ApiOperation({ title: 'Microservice Info' }),
    swagger_1.ApiResponse({
        status: 200,
        description: 'Check if the microservice is up'
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Object)
], ManagementController.prototype, "info", null);
ManagementController = __decorate([
    common_1.Controller('management'),
    common_1.UseInterceptors(logging_interceptor_1.LoggingInterceptor),
    swagger_1.ApiUseTags('management-controller')
], ManagementController);
exports.ManagementController = ManagementController;
//# sourceMappingURL=management.controller.js.map