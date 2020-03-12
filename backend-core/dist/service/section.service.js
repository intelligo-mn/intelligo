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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const section_repository_1 = require("../repository/section.repository");
let SectionService = class SectionService {
    constructor(sectionRepository) {
        this.sectionRepository = sectionRepository;
        this.logger = new common_1.Logger('SectionService');
    }
    async findById(id) {
        return await this.sectionRepository.findOne(id);
    }
    async findByfields(options) {
        return await this.sectionRepository.findOne(options);
    }
    async findAndCount(options) {
        return await this.sectionRepository.findAndCount(options);
    }
    async save(section) {
        return await this.sectionRepository.save(section);
    }
    async update(section) {
        return await this.save(section);
    }
    async delete(section) {
        return await this.sectionRepository.remove(section);
    }
};
SectionService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(section_repository_1.SectionRepository)),
    __metadata("design:paramtypes", [section_repository_1.SectionRepository])
], SectionService);
exports.SectionService = SectionService;
//# sourceMappingURL=section.service.js.map