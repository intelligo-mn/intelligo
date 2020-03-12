"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const config_1 = require("./config");
function setupSwagger(app) {
    const logger = new common_1.Logger('Swagger');
    const swaggerEndpoint = config_1.config.get('jhipster.swagger.path');
    const options = new swagger_1.DocumentBuilder()
        .setTitle(config_1.config.get('jhipster.swagger.title'))
        .setDescription(config_1.config.get('jhipster.swagger.description'))
        .setVersion(config_1.config.get('jhipster.swagger.version'))
        .addBearerAuth()
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, options);
    swagger_1.SwaggerModule.setup(swaggerEndpoint, app, document);
    logger.log(`Added swagger on endpoint ${swaggerEndpoint}`);
}
exports.setupSwagger = setupSwagger;
//# sourceMappingURL=swagger.js.map