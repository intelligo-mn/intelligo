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
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let ProductService = class ProductService {
    constructor(productModel) {
        this.productModel = productModel;
    }
    async findAll() {
        return await this.productModel.find().populate('owner');
    }
    async findByOwner(userId) {
        return await this.productModel.find({ owner: userId }).populate('owner');
    }
    async findById(id) {
        const product = await this.productModel.findById(id).populate('owner');
        if (!product) {
            throw new common_1.HttpException('Product not found', common_1.HttpStatus.NO_CONTENT);
        }
        return product;
    }
    async create(productDTO, user) {
        const product = await this.productModel.create(Object.assign(Object.assign({}, productDTO), { owner: user }));
        await product.save();
        return product.populate('owner');
    }
    async update(id, productDTO, userId) {
        const product = await this.productModel.findById(id);
        if (userId !== product.owner.toString()) {
            throw new common_1.HttpException('You do not own this product', common_1.HttpStatus.UNAUTHORIZED);
        }
        await product.update(productDTO);
        return await this.productModel.findById(id).populate('owner');
    }
    async delete(id, userId) {
        const product = await this.productModel.findById(id);
        if (userId !== product.owner.toString()) {
            throw new common_1.HttpException('You do not own this product', common_1.HttpStatus.UNAUTHORIZED);
        }
        await product.remove();
        return product.populate('owner');
    }
};
ProductService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel('Product')),
    __metadata("design:paramtypes", [mongoose_2.Model])
], ProductService);
exports.ProductService = ProductService;
//# sourceMappingURL=product.service.js.map