import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ProductSchema } from '../models/product.schema';
import { CoreModule } from '../core/core.module';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Product', schema: ProductSchema }]),
    CoreModule,
  ],
  providers: [ProductService],
  controllers: [ProductController],
})
export class ProductModule {}
